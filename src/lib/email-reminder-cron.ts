import cron from 'node-cron';
import { db } from '@/drizzle/db';
import { appointments, userTable } from '@/drizzle/schema';
import { eq, or } from 'drizzle-orm';
import emailQueue from './email-reminder-queue-and-worker';
import { formatRFC7231 } from 'date-fns';

const startCron = ()=>{
  cron.schedule('30 0 * * *',async()=>{
    const currentDate = new Date();
    const appointmentsIn7Days = new Date(currentDate.setDate(currentDate.getDate() + 7)).toISOString().split('T')[0];
    const appointmentsIn2Day = new Date(currentDate.setDate(currentDate.getDate() + 2)).toISOString().split('T')[0];

    const data = await db.select({
      firstName: userTable.firstName,
      lastName: userTable.lastName,
      email: userTable.email,
      date: appointments.appointmentDate,
    }).from(appointments)
    .where(
      or(
        eq(appointments.appointmentDate, appointmentsIn7Days),
        eq(appointments.appointmentDate, appointmentsIn2Day)
      ))
    .innerJoin(userTable, eq(appointments.userId, userTable.id));
      

    data.forEach(async(appointment)=>{
      await emailQueue.add('emailReminder', 
        {
        email:appointment.email, 
        appointmentDate: formatRFC7231(new Date(appointment.date)), 
        firstName: appointment.firstName, 
        lastName: appointment.lastName
        }, 
        {attempts:3});
    })


  });
}

export default startCron;