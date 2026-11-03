/* Automatic sunrise/sunset theme, calculated locally for Paris (no location access). */
(() => {
  const LAT=48.8566, LON=2.3522;
  const RAD=Math.PI/180, J1970=2440588, J2000=2451545;
  const toJulian=d=>d.valueOf()/86400000-0.5+J1970;
  const fromJulian=j=>new Date((j+0.5-J1970)*86400000);
  const solarMeanAnomaly=d=>RAD*(357.5291+0.98560028*d);
  const eclipticLongitude=m=>m+RAD*(1.9148*Math.sin(m)+0.02*Math.sin(2*m)+0.0003*Math.sin(3*m))+RAD*102.9372+Math.PI;
  const solarTransit=(ds,m,l)=>J2000+ds+0.0053*Math.sin(m)-0.0069*Math.sin(2*l);
  const hourAngle=(h,phi,dec)=>Math.acos((Math.sin(h)-Math.sin(phi)*Math.sin(dec))/(Math.cos(phi)*Math.cos(dec)));
  function sunTimes(date){
    // Use local Paris civil date, even if the device's timezone differs.
    const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Paris',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(date);
    const get=k=>Number(parts.find(p=>p.type===k).value);
    const day=new Date(Date.UTC(get('year'),get('month')-1,get('day'),12));
    const lw=-LON*RAD, phi=LAT*RAD, d=toJulian(day)-J2000;
    const n=Math.round(d-0.0009-lw/(2*Math.PI)), ds=0.0009+lw/(2*Math.PI)+n;
    const m=solarMeanAnomaly(ds), l=eclipticLongitude(m), dec=Math.asin(Math.sin(l)*Math.sin(23.4397*RAD));
    const w=hourAngle(-0.833*RAD,phi,dec), noon=solarTransit(ds,m,l);
    const sunset=solarTransit(ds+w/(2*Math.PI),m,l);
    return {sunrise:fromJulian(noon-(sunset-noon)),sunset:fromJulian(sunset)};
  }
  function preference(){try{return localStorage.getItem('ss-theme-mode')||'auto'}catch{return 'auto'}}
  let mode=preference();
  if(!['auto','light','dark'].includes(mode))mode='auto';
  function apply(){
    const now=new Date(),times=sunTimes(now);
    const light=now>=times.sunrise&&now<times.sunset;
    document.documentElement.dataset.theme=mode==='auto'?(light?'light':'dark'):mode;
    document.documentElement.dataset.themeMode=mode;
    const button=document.getElementById('themeToggle');
    if(!button)return;
    const fr=(typeof lang!=='undefined'&&lang==='fr');
    button.textContent=mode==='auto'?'◉':mode==='light'?'☀':'☾';
    const label=mode==='auto'?(fr?'Thème automatique selon le soleil — passer en mode jour':'Automatic sunrise/sunset theme — switch to light mode'):mode==='light'?(fr?'Mode jour — passer en mode nuit':'Light mode — switch to dark mode'):(fr?'Mode nuit — revenir au mode automatique':'Dark mode — return to automatic mode');
    button.setAttribute('aria-label',label);button.title=label;
    button.setAttribute('aria-pressed',String(mode!=='auto'));
  }
  // Apply before styles load; the button is initialized when the DOM is ready.
  apply();
  document.addEventListener('DOMContentLoaded',()=>{
    const button=document.getElementById('themeToggle');
    button?.addEventListener('click',()=>{
      mode=mode==='auto'?'light':mode==='light'?'dark':'auto';
      try{localStorage.setItem('ss-theme-mode',mode)}catch{}
      apply();
    });
    document.getElementById('lang')?.addEventListener('click',apply);
    apply();
  });
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)apply()});
  setInterval(()=>{if(mode==='auto')apply()},60000);
})();
