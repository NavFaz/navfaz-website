(() => {
const $=id=>document.getElementById(id), fmt=n=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:2}).format(n);
document.querySelectorAll('[data-calc]').forEach(btn=>btn.addEventListener('click',()=>{
 const type=btn.dataset.calc, out=$('calcResult'); let msg='';
 const num=id=>{const el=$(id);return el&&el.value!==''?Number(el.value):NaN};
 const valid=(...xs)=>xs.every(Number.isFinite);
 try {
 if(type==='percentage'){let a=num('p1'),b=num('p2');if(!valid(a,b))throw 0;msg=`${a}% of ${b} = ${(a/100*b).toLocaleString('en-IN',{maximumFractionDigits:6})}`;}
 if(type==='discount'){let a=num('amount'),b=num('rate');if(!valid(a,b)||a<0||b<0||b>100)throw 0;msg=`Final price: ${fmt(a*(1-b/100))} · Savings: ${fmt(a*b/100)}`;}
 if(type==='gst'){let a=num('amount'),b=num('rate'),mode=$('mode').value;if(!valid(a,b)||a<0||b<0)throw 0;let base=mode==='add'?a:a/(1+b/100),tax=mode==='add'?a*b/100:a-base,total=base+tax;msg=`Taxable amount: ${fmt(base)} · GST: ${fmt(tax)} · Total: ${fmt(total)}`;}
 if(type==='emi'){let p=num('principal'),annual=num('rate'),n=num('months');if(!valid(p,annual,n)||p<0||annual<0||n<=0||!Number.isInteger(n))throw 0;let r=annual/1200,emi=r===0?p/n:p*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1);msg=`Monthly EMI: ${fmt(emi)} · Total repayment: ${fmt(emi*n)} · Total interest: ${fmt(emi*n-p)}`;}
 if(type==='age'){let d=$('dob').value,a=$('asof').value;if(!d||!a||a<d)throw 0;let birth=new Date(d+'T12:00:00'),end=new Date(a+'T12:00:00');let y=end.getFullYear()-birth.getFullYear(),m=end.getMonth()-birth.getMonth(),day=end.getDate()-birth.getDate();if(day<0){m--;day+=new Date(end.getFullYear(),end.getMonth(),0).getDate()}if(m<0){y--;m+=12}msg=`Age: ${y} years, ${m} months and ${day} days`;}
 if(type==='margin'){let c=num('cost'),s=num('selling');if(!valid(c,s)||c<0||s<0||s===0)throw 0;let p=s-c;msg=`Profit: ${fmt(p)} · Margin: ${(p/s*100).toFixed(2)}% · Markup: ${c===0?'not defined':(p/c*100).toFixed(2)+'%'}`;}
 if(type==='salary'){let m=num('monthly');if(!valid(m)||m<0)throw 0;msg=`Annual gross salary: ${fmt(m*12)}`;}
 if(type==='savings'){let g=num('goal'),s=num('saved'),m=num('months');if(!valid(g,s,m)||g<0||s<0||m<=0)throw 0;msg=s>=g?'Your current savings meet or exceed the target.':`Monthly saving needed: ${fmt((g-s)/m)}`;}
 if(type==='date'){let a=$('date1').value,b=$('date2').value;if(!a||!b)throw 0;let days=Math.round((new Date(b+'T12:00:00')-new Date(a+'T12:00:00'))/86400000);msg=`${Math.abs(days).toLocaleString('en-IN')} days${days<0?' (end date is before start date)':''}`;}
 out.textContent=msg;
 } catch(e){out.textContent='Please enter valid values. Check that fields are not empty, amounts are non-negative, and rates or dates are in range.';}
}));
const today=new Date().toISOString().slice(0,10);if($('asof'))$('asof').value=today;if($('dob'))$('dob').max=today;if($('date1'))$('date1').value=today;if($('date2'))$('date2').value=today;
})();