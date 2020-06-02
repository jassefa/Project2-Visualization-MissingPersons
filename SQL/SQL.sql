 DROP Table if Exists missing_persons;
 DROP Table if Exists final_missing;
	
CREATE TABLE missing_persons (
  "Computed Missing Max Age" INT, 
  "Race / Ethnicity" VARCHAR, 
  "Date Of Last Contact" DATE, 
  "State Of Last Contact" VARCHAR, 
  "Gender" VARCHAR
);

select * from missing_persons;
 
 
select "Date Of Last Contact", "Gender", count("Gender") 
from missing_persons
group by "Date Of Last Contact", "Gender" 
order by "Date Of Last Contact";

CREATE TABLE missing_mf AS
select "Date Of Last Contact", count(*) as Female
From missing_persons
where "Gender"= 'Female' and "Date Of Last Contact" < '2019-12-31'
group by "Gender", "Date Of Last Contact"
order by "Date Of Last Contact";

select * from missing_mf;

 
CREATE TABLE missing_tt AS
select "Date Of Last Contact", count(*) as total
From missing_persons
Where "Date Of Last Contact" < '2019-12-31'
group by  "Date Of Last Contact"
order by "Date Of Last Contact";

select * from missing_tt;

CREATE TABLE missing_mm AS
select "Date Of Last Contact", count(*) as male
From missing_persons
where "Gender"= 'Male' and "Date Of Last Contact" < '2019-12-31'
group by "Gender", "Date Of Last Contact"
order by "Date Of Last Contact";

select * from missing_mm;

select t."Date Of Last Contact" as date, m.male, f.female, t.total
into final_missing 
from missing_tt as t
left join missing_mf as f
on (t."Date Of Last Contact"= f."Date Of Last Contact" )
left join missing_mm as m
on (t."Date Of Last Contact"= m."Date Of Last Contact" )
order by t."Date Of Last Contact";

select * from final_missing;

UPDATE final_missing
SET female=0
WHERE female IS NULL;

UPDATE final_missing
SET male=0
WHERE male IS NULL;



select * from final_missing;

 
 