import { relations } from "drizzle-orm";
import { boolean, date, doublePrecision, index, integer, pgEnum, pgTable, primaryKey, serial, text, time, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const genderEnum = pgEnum('gender', ['Female', 'Male']);

export const bloodTypesEnum = pgEnum('blood_types_enum', ['unknown','A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']);

export const userTable = pgTable('user_table', {
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    firstName: varchar('first_name', { length: 255 }).notNull(),
    lastName: varchar('last_name', { length: 255 }).notNull(),
    email: varchar('user_email', { length: 255 }).unique().notNull(),
    emailVerified: boolean('email_verified').notNull(),
    pictureUrl: text("picture_url"),
    phoneNumber: varchar('phone_number', { length: 20 }),
    gender: genderEnum('gender'),
    address: varchar('address',{length: 255}),
    isEligible: boolean('is_eligible'),
    dateOfBirth: date('date_of_birth'),
    password: text('user_password').notNull(),
    githubId: integer('github_id').unique(),
    username: varchar('username'),
    googleId: text("google_id").unique(),
    countryCode: integer('country_code').references(()=>countries.id,{
        onDelete: "restrict",
    }).notNull(),
    zip: varchar('zip', {length: 20}),
    province: varchar('province', {length: 255}),
    bloodType: integer('blood_type').references(() => bloodTypes.id, {
        onDelete: "restrict",
    })
},(table)=>{
    return{
        userIdIndex: index("user_id_index").on(table.id)
    }
});

export const bloodTypes = pgTable('blood_types', {
    id: serial('id').primaryKey().notNull(),
    bloodTypeName: bloodTypesEnum('blood_type_name')
});

export const bloodBanks = pgTable('blood_banks', {
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    emailVerified: boolean('email_verified').notNull(),
    address: text('address').notNull(),
    password: text('password').notNull(),
    country: integer('country').notNull().references(() => countries.id, {
        onDelete: 'restrict'
    }),
    latitude: doublePrecision('latitude').notNull(),
    longitude: doublePrecision('longitude').notNull(),
    zip: varchar('zip', {length: 20}),
    province: varchar('province', {length: 255}),
},(table)=>{
    return{
        bloodBankIdIndex: index("blood_bank_id_index").on(table.id)
    }
});

export const bloodBanksSessions = pgTable('blood_banks_sessions', {
    id: text('id').primaryKey(),
    userId: uuid('user_id').references(() => bloodBanks.id, {
        onDelete: 'cascade'
    }).notNull(),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date"
    }).notNull(),
});

export const countries = pgTable('countries', {
    id: serial('id').notNull().primaryKey(),
    countryName: varchar('name', { length: 255 }).notNull().unique(), 
    dialCode: varchar("dial_code",{length:8}).notNull(),
    code: varchar("code", {length:3}).notNull(),
});

export const facilityDetails = pgTable('facility_details', {
    id: serial('id').primaryKey().notNull(),
    numberOfBeds: integer('number_of_beds').notNull(),
    capacity: integer('capacity').notNull(),
    emergencyContact: varchar('emergency_contact', { length: 1024 }),
    bloodBankId: uuid('blood_bank_id').references(() => bloodBanks.id, {
        onDelete: 'cascade',
    }).notNull()
},(table)=>{
    return{
        facilityBloodBankIdIndex: index("facility_blood_bank_index").on(table.bloodBankId)
    }
});

export const servicesEnum = pgEnum('services_enum', ['Blood Donation', 'Plasma Donation', 'Platelets Donation', 'Others']);

export const services = pgTable('services', {
    id: serial('id').primaryKey().notNull(),
    serviceName: servicesEnum('service_name').notNull(),
    bloodBankId: uuid('blood_bank_id').references(() => bloodBanks.id, {
        onDelete: 'cascade',
    }).notNull()
},(table)=>{
    return{
        servicesBloodBankIdIndex: index("services_blood_bank_index").on(table.bloodBankId)
    }
});

export const daysEnum = pgEnum('days_enum', ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);

export const workingDaysHours = pgTable('working_days_hours', {
    id: serial('id').primaryKey().notNull(),
    day: daysEnum('day').notNull(),
    isWorking: boolean('is_working').notNull(),
    startsAt: time('starts_at').notNull(),
    endsAt: time('ends_at').notNull(),
    bloodBankId: uuid('blood_bank_id').references(() => bloodBanks.id, {
        onDelete: 'cascade',
    }).notNull()
},(table)=>{
    return{
        workingBloodBankIdIndex: index("working_blood_bank_index").on(table.bloodBankId)
    }
});

export const certifications = pgTable('certifications', {
    id: serial('id').primaryKey().notNull(),
    licenseNumber: varchar('license_number', { length: 1024 }),
    certificationUrl1: text('certification_url_1'),
    certificationUrl2: text('certification_url_2'),
    certificationUrl3: text('certification_url_3'),
    expiryDate: date('expiry_date').notNull(),
    bloodBankId: uuid('blood_bank_id').references(() => bloodBanks.id, {
        onDelete: 'cascade',
    }).notNull(),
},(table)=>{
    return{
        certificationsBloodBankIdIndex: index("certifications_blood_bank_index").on(table.bloodBankId)
    }
});

export const events = pgTable('events', {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    address: varchar('address', { length: 1024 }).notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description').notNull(),
    eventDate: date('event_date').notNull(),
    startsAt: time('startsAt', {
        withTimezone: false,
    }).notNull(),
    endsAt: time('endsAt', {
        withTimezone: false,
    }).notNull(),
    pictureURL: text('picture_url').notNull(),
    bloodBankId: uuid('blood_bank_id').references(() => bloodBanks.id, {
        onDelete: 'cascade',
    }),
},(table)=>{
    return{
        eventBloodBankIdIndex: index("event_blood_bank_index").on(table.bloodBankId)
    }
});

export const appointments = pgTable('appointments', {
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    appointmentDate: date('appointment_date').notNull(),
    appointmentTime: time('appointment_time', { withTimezone: false }),
    donationGap: integer('donation_gap').notNull(),
    userId: uuid('user_id').references(() => userTable.id, {
        onDelete: 'cascade'
    }).notNull(),
    bloodBankId: uuid('blood_bank_id').references(() => bloodBanks.id, {
        onDelete: 'restrict'
    })
},(table)=>{
    return{
        appointmentsBloodBankIdIndex: index("appointments_blood_bank_index").on(table.bloodBankId),
        appointmentsUserIdIndex: index("appointments_user_id_index").on(table.bloodBankId),
    }
});

export const sessions = pgTable('sessions', {
    id: text('id').primaryKey(),
    userId: uuid('user_id').references(() => userTable.id, {
        onDelete: 'cascade'
    }).notNull(),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date"
    }).notNull(),
});

export const emailVerificationTable = pgTable('email_verification_table', {
    id: serial('id').primaryKey().notNull(),
    code: varchar('code').notNull(),
    userId: uuid('user_id').references(() => userTable.id, {
        onDelete: 'cascade'
    }).unique(),
    bloodBankId: uuid('blood_bank_id').references(() => bloodBanks.id, {
        onDelete: 'cascade',
    }),
    email: varchar('email', { length: 255 }).notNull(),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date"
    }).notNull(),
});

export const passwordTokensTable = pgTable('password_tokens', {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    tokenHash: text('token_hash').unique().notNull(),
    userId: uuid('user_id').references(() => userTable.id, {
        onDelete: 'cascade',
    }).notNull(),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date"
    }).notNull(),
});

// Setting up relations for Drizzle ORM
export const usersRelations = relations(userTable, ({ many, one }) => ({
    sessions: many(sessions),
    emailVerification: one(emailVerificationTable),
    passwordReset: one(passwordTokensTable),
    bloodType: one(bloodTypes, {
        fields: [userTable.bloodType],
        references: [bloodTypes.id]
    }),
    appointments: many(appointments),
}));

export const bloodTypesRelations = relations(bloodTypes, ({ many }) => ({
    userBloodType: many(userTable),
    bloodBanks: many(bloodBanks),
}));

export const emailVerificationTableRelations = relations(emailVerificationTable, ({ one }) => ({
    user: one(userTable, {
        fields: [emailVerificationTable.userId],
        references: [userTable.id],
    }),
    bank: one(bloodBanks, {
        fields: [emailVerificationTable.bloodBankId],
        references: [bloodBanks.id],
    })
}));

export const bloodBanksSessionsRelations = relations(bloodBanksSessions,({one})=>({
    bank: one(bloodBanks, {
        fields: [bloodBanksSessions.userId],
        references: [bloodBanks.id],
    })
}))

export const passwordTokensTableRelations = relations(passwordTokensTable, ({ one }) => ({
    user: one(userTable, {
        fields: [passwordTokensTable.userId],
        references: [userTable.id]
    })
}));

export const sessionsRelation = relations(sessions, ({ one }) => ({
    user: one(userTable, {
        fields: [sessions.userId],
        references: [userTable.id],
    }),
}));

export const appointmentsRelations = relations(appointments, ({ one }) => ({
    user: one(userTable, {
        fields: [appointments.userId],
        references: [userTable.id],
    }),
    bloodBank: one(bloodBanks, {
        fields: [appointments.bloodBankId],
        references: [bloodBanks.id],
    }),
}));

export const bloodBanksRelations = relations(bloodBanks, ({ many, one }) => ({
    country: one(countries, {
        fields: [bloodBanks.country],
        references: [countries.id],
    }),
    emailVerification: one(emailVerificationTable),
    sessions: one(bloodBanksSessions),
    appointments: many(appointments),
    workingTimes: many(workingDaysHours),
    facilityDetails: one(facilityDetails),
    services: many(services),
    certifications: many(certifications),
    events: many(events),
    bloodTypes: many(bloodTypes),
}));

export const bloodStocks = pgTable('blood_stocks', {
    bloodTypeId: integer('blood_type_id').notNull().references(() => bloodTypes.id, {
        onDelete: 'restrict'
    }),
    bloodBankId: uuid('blood_bank_id').notNull().references(() => bloodBanks.id, {
        onDelete: 'restrict'
    }),
}, (table) => ({
    pk: primaryKey({ columns: [table.bloodTypeId, table.bloodBankId] })
}));

export const facilityDetailsRelations = relations(facilityDetails, ({ one }) => ({
    bloodBank: one(bloodBanks, {
        fields: [facilityDetails.bloodBankId],
        references: [bloodBanks.id],
    })
}));

export const servicesRelations = relations(services, ({ one }) => ({
    bloodBank: one(bloodBanks, {
        fields: [services.bloodBankId],
        references: [bloodBanks.id],
    })
}));

export const workingDaysHoursRelations = relations(workingDaysHours, ({ one }) => ({
    bloodBank: one(bloodBanks, {
        fields: [workingDaysHours.bloodBankId],
        references: [bloodBanks.id],
    })
}));

export const certificationsRelations = relations(certifications, ({ one }) => ({
    bloodBank: one(bloodBanks, {
        fields: [certifications.bloodBankId],
        references: [bloodBanks.id],
    })
}));

export const eventsRelations = relations(events, ({ one }) => ({
    bloodBank: one(bloodBanks, {
        fields: [events.bloodBankId],
        references: [bloodBanks.id],
    })
}));

export const countriesRelations = relations(countries, ({ many }) => ({
    bloodBanks: many(bloodBanks),
}));

export const bloodStocksRelations = relations(bloodStocks, ({ one }) => ({
    bloodType: one(bloodTypes, {
        fields: [bloodStocks.bloodTypeId],
        references: [bloodTypes.id],
    }),
    bloodBank: one(bloodBanks, {
        fields: [bloodStocks.bloodBankId],
        references: [bloodBanks.id],
    })
}));
