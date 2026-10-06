"""Generate reproducible, clearly labelled demo dashboard views and case studies.
All records are synthetic. Run from any directory; no external data or packages needed.
"""
from pathlib import Path
from html import escape
import json

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/projects'
OUT.mkdir(parents=True, exist_ok=True)

def money(v): return f'PKR {v/1000000:.2f}m' if abs(v)>=1000000 else 'PKR '+f'{v/1000:.2f}'.rstrip('0').rstrip('.')+'k'
def pct(v): return f'{v:.1f}%'
def num(v): return f'{v:,.0f}'
def project(pid,title,category,color,records):
 return dict(id=pid,title=title,category=category,color=color,records=records)

retail=project('retail-performance','Retail Revenue & Margin','Retail','#2563eb',[
 dict(name=n,revenue=r,cost=c,orders=o) for n,r,c,o in [('Jan',420000,315000,140),('Feb',460000,340000,150),('Mar',510000,370000,170),('Apr',570000,420000,190),('May',610000,470000,205),('Jun',680000,550000,230)]])
farm=project('farm-profitability','Farm Cost & Profitability','Agriculture','#0f766e',[
 dict(name=n,acres=a,yield_tonnes=y,price_per_tonne=p,cost=c) for n,a,y,p,c in [('Wheat A',10,15,90000,980000),('Wheat B',8,10.4,90000,780000),('Rice A',10,20,120000,1850000),('Rice B',8,14.4,120000,1430000),('Maize A',6,15,60000,640000),('Maize B',8,18,60000,830000)]])
credit=project('credit-collections','Credit & Collections Monitor','Finance','#7c3aed',[
 dict(name=n,invoiced=i,paid=p,days_overdue=d) for n,i,p,d in [('Account A',220000,140000,0),('Account B',180000,60000,14),('Account C',300000,100000,45),('Account D',160000,120000,8),('Account E',250000,50000,72),('Account F',140000,120000,0)]])
stock=project('inventory-planning','Inventory & Reorder Planning','Operations','#0284c7',[
 dict(name=n,stock=s,daily_demand=d,lead_days=l,unit_cost=c) for n,s,d,l,c in [('SKU-101',120,20,10,500),('SKU-102',450,15,12,300),('SKU-103',80,16,7,750),('SKU-104',600,10,14,200),('SKU-105',200,25,9,450),('SKU-106',350,7,14,600)]])
marketing=project('marketing-efficiency','Marketing Funnel & Efficiency','Marketing','#c2410c',[
 dict(name=n,spend=s,leads=l,orders=o,revenue=r) for n,s,l,o,r in [('Search',140000,1000,110,550000),('Social',100000,1400,56,280000),('Email',30000,500,90,360000),('Display',80000,900,27,135000),('Affiliate',60000,420,63,315000),('Video',90000,1000,40,200000)]])

# All ratios and totals below are derived from these same records.
r=retail['records']; revenue=sum(x['revenue'] for x in r);profit=sum(x['revenue']-x['cost'] for x in r)
retail.update(subtitle='Revenue quality, not just sales volume',description='Compare sales growth with gross margin to identify where a stronger top line may hide rising costs.',
 problem='A retailer sees sales increasing but cannot tell whether additional orders are producing stronger margins. Monthly sales and costs need to be compared on the same basis.',
 solutionApproach=['Aggregate revenue, cost of goods and order counts at the monthly grain.','Calculate gross profit = revenue − cost; gross margin = gross profit / revenue.','Compare month-to-month revenue and margin, then flag margin compression for investigation.'],
 findings=[f'Total sample revenue is {money(revenue)} with a weighted gross margin of {pct(profit/revenue*100)}.',f'June revenue is {pct((680000/420000-1)*100)} above January, but gross margin falls from 25.0% to 19.1%.','June gross profit is PKR 130k; May is PKR 140k despite lower revenue.'],
 recommendation='Review June purchasing costs, discounts and product mix before treating higher sales as better performance.',
 limitation='Six synthetic monthly aggregates; gross profit excludes operating expenses, tax and returns. The data cannot establish why costs changed.',
 kpis=[('Revenue',money(revenue)),('Gross profit',money(profit)),('Gross margin',pct(profit/revenue*100)),('Orders',num(sum(x['orders'] for x in r)))],
 primary=('Monthly revenue','PKR thousands',[(x['name'],x['revenue']/1000) for x in r]),
 secondary=('Gross margin by month','Percent',[(x['name'],(x['revenue']-x['cost'])/x['revenue']*100) for x in r]),
 headers=['Month','Revenue','Gross profit','Margin'],rows=[[x['name'],money(x['revenue']),money(x['revenue']-x['cost']),pct((x['revenue']-x['cost'])/x['revenue']*100)] for x in r],
 captions=['Revenue grows across six months; the overview pairs volume with gross profit.','The margin view highlights compression in May and June despite higher sales.','The monthly detail makes the June profit decline visible and supports a cost review.'])

r=farm['records']
for x in r:x['revenue']=round(x['yield_tonnes']*x['price_per_tonne']);x['profit']=x['revenue']-x['cost']
rev=sum(x['revenue'] for x in r);cost=sum(x['cost'] for x in r);acres=sum(x['acres'] for x in r)
farm.update(subtitle='Compare crop blocks on a per-acre basis',description='A farm dashboard concept connecting crop revenue, production cost and contribution per acre.',
 problem='Comparing crop revenue alone can favor larger or more expensive blocks. A farm needs a consistent way to compare recorded costs and contribution per acre.',
 solutionApproach=['Keep one record per crop block with area, harvested tonnes, selling price and recorded cost.','Calculate revenue = tonnes × price, and contribution = revenue − recorded cost.','Normalize contribution by acres and compare blocks before investigating differences.'],
 findings=[f'The sample covers {acres} acres with revenue of {money(rev)} and contribution of {money(rev-cost)}.','Rice A generates PKR 55k contribution per acre, the highest sample block.','Wheat B generates PKR 19.5k per acre, compared with PKR 37k for Wheat A.'],
 recommendation='Investigate the lower-performing wheat block using actual input, irrigation and soil records before changing crop allocation.',
 limitation='Synthetic single-season blocks. Contribution uses only recorded costs; weather, soil, labor allocation and market uncertainty are not modeled.',
 kpis=[('Area',f'{acres} acres'),('Revenue',money(rev)),('Recorded cost',money(cost)),('Contribution',money(rev-cost))],
 primary=('Revenue by crop block','PKR thousands',[(x['name'],x['revenue']/1000) for x in r]),
 secondary=('Contribution per acre','PKR thousands / acre',[(x['name'],x['profit']/x['acres']/1000) for x in r]),
 headers=['Crop block','Acres','Revenue','Contribution / acre'],rows=[[x['name'],num(x['acres']),money(x['revenue']),money(x['profit']/x['acres'])] for x in r],
 captions=['The overview summarizes the same six crop blocks and their recorded costs.','Per-acre contribution provides a fairer comparison than total revenue alone.','Block-level detail identifies questions for a farm cost review; it is not a yield forecast.'])

r=credit['records']
for x in r:x['outstanding']=x['invoiced']-x['paid']
total=sum(x['outstanding'] for x in r);overdue=sum(x['outstanding'] for x in r if x['days_overdue']>0);late=sum(x['outstanding'] for x in r if x['days_overdue']>30)
credit.update(subtitle='Know which balances need attention',description='A collections dashboard concept with outstanding balances, aging buckets and a transparent review queue.',
 problem='A small business needs to distinguish current balances from overdue credit and decide which accounts deserve a follow-up first.',
 solutionApproach=['Reconcile invoiced and paid amounts at the account level.','Calculate outstanding = invoiced − paid and group balances by days overdue.','Order a review queue by overdue days and balance; retain current accounts separately.'],
 findings=[f'Total outstanding is {money(total)}; overdue balances represent {pct(overdue/total*100)} of it.',f'Balances more than 30 days overdue total {money(late)} across two accounts.','Accounts C and E each owe PKR 200k; E has the longer overdue period at 72 days.'],
 recommendation='Start a manual follow-up with the two oldest large balances, then verify payment commitments and disputes.',
 limitation='Synthetic account snapshot. Aging indicates collection priority, not a probability of default or a credit score.',
 kpis=[('Outstanding',money(total)),('Overdue',money(overdue)),('Over 30 days',money(late)),('Accounts','6')],
 primary=('Outstanding by account','PKR thousands',[(x['name'],x['outstanding']/1000) for x in r]),
 secondary=('Balance aging','PKR thousands',[(label,sum(x['outstanding'] for x in r if lo<=x['days_overdue']<=hi)/1000) for label,lo,hi in [('Current',0,0),('1–30 days',1,30),('31–60 days',31,60),('61+ days',61,999)]]),
 headers=['Account','Outstanding','Days overdue','Review status'],rows=[[x['name'],money(x['outstanding']),str(x['days_overdue']),'Priority review' if x['days_overdue']>30 else 'Follow up' if x['days_overdue']>0 else 'Current'] for x in sorted(r,key=lambda x:x['days_overdue'],reverse=True)],
 captions=['The overview separates total outstanding from overdue credit using one account snapshot.','Aging buckets reveal PKR 400k more than 30 days overdue.','The action view orders accounts by overdue days for human review, without assigning a credit score.'])

r=stock['records']
for x in r:x['cover_days']=x['stock']/x['daily_demand'];x['reorder_gap']=max(0,x['daily_demand']*x['lead_days']-x['stock'])
value=sum(x['stock']*x['unit_cost'] for x in r);at_risk=sum(x['reorder_gap']>0 for x in r)
stock.update(subtitle='Balance availability with stock investment',description='Compare available stock with demand during supplier lead time and surface replenishment gaps.',
 problem='A stock manager cannot judge availability from unit counts alone because SKUs have different demand rates and supplier lead times.',
 solutionApproach=['Use one synthetic SKU record with stock, daily demand, lead time and unit cost.','Compute days of cover = stock / daily demand and lead-time demand = daily demand × lead days.','Flag positive gaps between lead-time demand and available stock; review slow-moving items separately.'],
 findings=[f'{at_risk} of 6 SKUs have stock below modeled lead-time demand.',f'The combined replenishment gap is {num(sum(x["reorder_gap"] for x in r))} units; SKU-101 accounts for 80 units.','SKU-104 holds 60 days of cover versus a 14-day supplier lead time.'],
 recommendation='Review open purchase orders for the three flagged SKUs before placing new orders; investigate excess cover on SKU-104.',
 limitation='Constant synthetic demand, no safety stock, seasonality or open orders. Gaps are review signals, not automatic purchase quantities.',
 kpis=[('Stock value',money(value)),('SKUs','6'),('Below lead demand',str(at_risk)),('Gap',f'{num(sum(x["reorder_gap"] for x in r))} units')],
 primary=('Available stock','Units',[(x['name'],x['stock']) for x in r]),
 secondary=('Days of stock cover','Days',[(x['name'],x['cover_days']) for x in r]),
 headers=['SKU','Cover / lead days','Gap units','Review status'],rows=[[x['name'],f'{x["cover_days"]:.1f} / {x["lead_days"]}',num(x['reorder_gap']),'Replenish review' if x['reorder_gap'] else 'Monitor cover'] for x in sorted(r,key=lambda x:x['reorder_gap'],reverse=True)],
 captions=['Stock value and availability are calculated from the same six-SKU snapshot.','Days of cover helps compare items with different demand rates.','The replenishment queue shows gaps against lead-time demand and requires an open-order check.'])

r=marketing['records'];spend=sum(x['spend'] for x in r);rev=sum(x['revenue'] for x in r);orders=sum(x['orders'] for x in r);leads=sum(x['leads'] for x in r)
marketing.update(subtitle='Connect acquisition volume with efficiency',description='A channel-level dashboard concept comparing marketing spend, lead conversion and attributed revenue.',
 problem='A marketing team sees many leads but needs to compare channel efficiency without confusing lead volume with profitable customer acquisition.',
 solutionApproach=['Aggregate spend, leads, attributed orders and attributed revenue for the same sample period.','Calculate ROAS = attributed revenue / spend and lead-to-order rate = orders / leads.','Compare channel efficiency, noting attribution limits before proposing an experiment.'],
 findings=[f'Blended sample ROAS is {rev/spend:.2f}x across {money(spend)} of spend.',f'The sample records {num(orders)} orders from {num(leads)} leads: {pct(orders/leads*100)} lead-to-order conversion.','Email has 12.00x ROAS, while Display has 1.69x; channel intent and attribution differ.'],
 recommendation='Investigate the Display funnel and test a small budget change with controlled measurement instead of assuming ROAS proves causation.',
 limitation='Synthetic aggregates with simple attribution. ROAS is revenue divided by spend, not profit, incremental lift or a causal measure.',
 kpis=[('Spend',money(spend)),('Attributed revenue',money(rev)),('ROAS',f'{rev/spend:.2f}x'),('Orders',num(orders))],
 primary=('Spend by channel','PKR thousands',[(x['name'],x['spend']/1000) for x in r]),
 secondary=('Return on ad spend','Revenue / spend (x)',[(x['name'],x['revenue']/x['spend']) for x in r]),
 headers=['Channel','Leads → orders','Conversion','ROAS'],rows=[[x['name'],f'{x["leads"]} → {x["orders"]}',pct(x['orders']/x['leads']*100),f'{x["revenue"]/x["spend"]:.2f}x'] for x in r],
 captions=['The overview connects spend, attributed revenue and orders for one synthetic period.','Channel ROAS varies widely; the comparison is descriptive rather than causal.','Funnel detail shows conversion and return together so lead volume is not the only decision metric.'])

# SVG is used for precise text and data, with consistent chrome across each project's three views.
class SVG:
 def __init__(self): self.parts=['<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="900" viewBox="0 0 1440 900" role="img">']
 def rect(self,x,y,w,h,fill='#ffffff',rx=16,stroke=None):self.parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}"'+(f' stroke="{stroke}"' if stroke else '')+'/>')
 def text(self,x,y,t,size=18,color='#475569',weight=400):self.parts.append(f'<text x="{x}" y="{y}" font-family="DejaVu Sans, Arial, sans-serif" font-size="{size}" font-weight="{weight}" fill="{color}">{escape(str(t))}</text>')
 def line(self,x1,y1,x2,y2,color='#e2e8f0'):self.parts.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{color}"/>')
 def wrap(self,x,y,t,width=62,size=18,color='#475569',line=29):
  import textwrap
  for i,s in enumerate(textwrap.wrap(t,width=width)):self.text(x,y+i*line,s,size,color)
 def save(self,p):p.write_text('\n'.join(self.parts+['</svg>']))

def bars(s,x,y,w,h,title,unit,data,color,horizontal=False):
 s.rect(x,y,w,h,stroke='#e2e8f0');s.text(x+26,y+38,title,22,'#0f172a',700);s.text(x+26,y+65,unit,15)
 maximum=max(v for _,v in data)*1.12 or 1
 if horizontal:
  step=(h-108)/len(data)
  for i,(label,v) in enumerate(data):
   yy=y+94+i*step;s.text(x+26,yy+17,label,16);s.rect(x+143,yy,w-235,23,'#f1f5f9',5);s.rect(x+143,yy,(w-235)*v/maximum,23,color,5);s.text(x+w-75,yy+18,f'{v:,.1f}',15,'#0f172a',600)
 else:
  base=y+h-53;top=y+100;plot=base-top;left=x+60;pw=w-90
  for i in range(5):
   yy=base-plot*i/4;s.line(left,yy,x+w-25,yy);s.text(x+15,yy+5,f'{maximum*i/4:.0f}',13)
  step=pw/len(data)
  for i,(label,v) in enumerate(data):
   xx=left+i*step+step*.19;bh=v/maximum*plot;s.rect(xx,base-bh,step*.55,bh,color,5);s.text(xx,base-bh-9,f'{v:.1f}',14,'#0f172a',600);s.text(xx-4,base+28,label,13)

def draw(p,view):
 s=SVG();color=p['color'];s.rect(0,0,1440,900,'#f3f6fc',0);s.rect(0,0,215,900,'#0a0e3d',0)
 s.text(29,53,'ZH / ANALYTICS',19,'#ffffff',700);s.text(29,86,'PORTFOLIO LAB',12,'#93c5fd',600)
 for i,label in enumerate(['Overview','Performance','Action Detail']):
  yy=162+i* sixty
  if i==view:s.rect(18,yy-28,179,46,color,9)
  s.text(34,yy,label,16,'#ffffff' if i==view else '#b8c4dc',600)
 s.text(27,766,'SYNTHETIC DATA',12,'#93c5fd',700);s.wrap(27,800,'Illustrative dashboard. No client data.',width=21,size=13,color='#b8c4dc',line=22)
 s.text(254,54,p['category'].upper()+' / DEMO CASE STUDY',13,color,700)
 s.text(254,99,p['title'],32,'#0f172a',700);s.text(254,131,p['subtitle'],17)
 s.rect(1190,35,215,33,'#e2e8f0',16);s.text(1205,57,'DEMO · SAMPLE DATA',13,'#334155',700)
 s.text(254,170,['01  Executive overview','02  Performance comparison','03  Decision support detail'][view],16,'#334155',600)
 for i,(label,value) in enumerate(p['kpis']):
  xx=254+i*289;s.rect(xx,194,269,113,stroke='#e2e8f0');s.rect(xx,194,5,113,color,2);s.text(xx+21,227,label,15);s.text(xx+21,272,value,28,'#0f172a',700)
 a=p['primary'];b=p['secondary']
 if view==0:
  bars(s,254,331,714,412,a[0],a[1],a[2],color)
  s.rect(990,331,413,412,stroke='#e2e8f0');s.text(1015,372,'READ THE SIGNAL',16,color,700)
  for i,t in enumerate(p['findings'][:2]):s.wrap(1015,416+i*142,t,width=32,size=18)
 elif view==1:
  bars(s,254,331,714,412,b[0],b[1],b[2],color,True)
  s.rect(990,331,413,412,stroke='#e2e8f0');s.text(1015,372,'INTERPRETATION',16,color,700);s.wrap(1015,416,p['findings'][-1],width=32,size=18);s.wrap(1015,561,p['recommendation'],width=34,size=16)
 else:
  s.rect(254,331,1149,412,stroke='#e2e8f0');s.text(280,372,'Detail behind the decision',22,'#0f172a',700)
  cols=[280,520,810,1060];s.rect(271,395,1114,42,'#eef2ff',7)
  for x,h in zip(cols,p['headers']):s.text(x,422,h,16,'#334155',600)
  for i,row in enumerate(p['rows']):
   yy=477+i*43
   for x,v in zip(cols,row):s.text(x,yy,v,17,'#0f172a')
   if i<5:s.line(280,yy+13,1375,yy+13)
 s.rect(254,765,1149,79,'#ffffff',12,stroke='#e2e8f0');s.text(277,795,'ANALYST NOTE',12,color,700);s.wrap(277,823,p['captions'][view],width=117,size=16,line=22)
 s.text(254,878,'Zain Hassan  /  Demonstration only · Values calculated from the included sample records',13)
 s.text(1290,878,f'VIEW {view+1} / 3',13,color,700)
 s.save(OUT/f'{p["id"]}-{view+1}.svg')

sixty=60
projects=[retail,farm,credit,stock,marketing]
result=[]
for p in projects:
 assert len(p['records'])==6 and len(p['captions'])==3
 assert all(v>=0 for _,v in p['primary'][2]+p['secondary'][2])
 for view in range(3):draw(p,view)
 data={'source':'Synthetic sample data created for a portfolio demonstration. Not client data.','project':p['title'],'grain':'One record per '+{'retail-performance':'month','farm-profitability':'crop block','credit-collections':'account','inventory-planning':'SKU','marketing-efficiency':'channel'}[p['id']],'records':p['records'],'method':p['solutionApproach'],'limitations':p['limitation']}
 (OUT/f'{p["id"]}-data.json').write_text(json.dumps(data,indent=2)+'\n')
 result.append({k:p[k] for k in ['id','title','category','color','subtitle','description','problem','solutionApproach','findings','recommendation','limitation']} | {
 'flag':'','stack':['KPI Analysis','Dashboard Design','Sample Data'],'caseStudy':p['problem'],'highlights':p['findings'],
 'datasetUrl':f'/projects/{p["id"]}-data.json','dataNote':'Demo · Sample Data — synthetic records; not commissioned client work.',
 'implementation':'A reproducible dashboard concept with three static views, calculated from six included synthetic records. The portfolio gallery is interactive; the dashboard images are not a live BI report.',
 'screenshots':[{'src':f'/projects/{p["id"]}-{i+1}.svg','title':t,'caption':p['captions'][i],'alt':p['title']+' — '+t+'. '+p['captions'][i]} for i,t in enumerate(['Overview','Performance','Action Detail'])]})
(ROOT/'src/data/demo-projects.json').write_text(json.dumps(result,indent=2)+'\n')
print('Generated 5 case studies, 15 SVG dashboard views and 5 sample datasets.')
