import cron from 'node-cron';

const startCron = ()=>{
  cron.schedule('30 0 * * *', ()=>{
    console.log('cron has been triggered;');
  });
}

export default startCron;