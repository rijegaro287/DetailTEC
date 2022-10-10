create database Taller


use Taller



create table DEPARTMENT(
	
	Dname varchar(20) not null,
	Dnumber tinyint not null,
	Mgr_ssn varchar(9) not null,
	Mgr_star_date date,
	PRIMARY KEY(Dnumber),

)



create table EMPLOYEE(

	
	Fname varchar(20) not null,
	Minit char,
	Lname varchar(20) not null,
	Ssn char(9) not null,
	Bdate date,
	AddressE varchar(100),
	Sex char,
	Salary bigint,
	Super_Ssn char(9),
	Dno tinyint not null,
	PRIMARY KEY(Ssn),
	FOREIGN KEY(Super_ssn) REFERENCES EMPLOYEE(Ssn),
	FOREIGN KEY(Dno) REFERENCES DEPARTMENT(Dnumber)

)



create table DEPT_LOCATIONS(
	
	Dnumber tinyint not null,
	Dlocation varchar(30),
	FOREIGN KEY(Dnumber) REFERENCES DEPARTMENT(Dnumber)
)


create table PROJECT(
	
	Pname varchar(20) not null,
	Pnumber int not null,
	Plocation varchar(30) not null,
	Dnum tinyint not null,
	PRIMARY KEY(Pnumber),
	FOREIGN KEY(Dnum) REFERENCES DEPARTMENT(Dnumber)
)


create table WORKS_ON(
	
	Essn char(9) not null,
	Pno int not null,
	HoursW float,
	FOREIGN KEY(Essn) REFERENCES EMPLOYEE(Ssn),
	FOREIGN KEY(Pno) REFERENCES PROJECT(Pnumber)

)

create table DEPENDENTE(
	Essn char(9) not null,
	Dependent_name varchar(20) not null, 
	Sex char,
	Bdate date,
	Relationship varchar(20),
	FOREIGN KEY(Essn) REFERENCES EMPLOYEE(Ssn)
)

create table TASK(

	ID varchar(20),
	Rname varchar(20),
	Responsible char(9),
	Duration int,
	PRIMARY KEY(ID),
	FOREIGN KEY(Responsible) REFERENCES EMPLOYEE(Ssn)

)

create table PROJECT_TASK(
	
	ID_task varchar(20) not null,
	Pno int not null,
	FOREIGN KEY (ID_TASK) REFERENCES TASK(ID),
	FOREIGN KEY(Pno) REFERENCES PROJECT(Pnumber)

)

INSERT INTO DEPARTMENT VALUES ('Research', '5', '333445555', '1988-05-22')
INSERT INTO DEPARTMENT VALUES ('Administration', '4', '987654321', '1995-01-01')
INSERT INTO DEPARTMENT VALUES ('Headquarters', '1', '888665555', '1981-06-19')


INSERT INTO EMPLOYEE VALUES ('James', 'E', 'Borg', '888665555', '1937-11-10', '451 Stone, Houston, TX', 'M', 55000, NULL, 1)
INSERT INTO EMPLOYEE VALUES ('Franklin', 'T', 'Wong', '333445555', '1955-12-08', '638 Voss, Houston, TX', 'M', 40000, '888665555', 5)
INSERT INTO EMPLOYEE VALUES ('Jennifer', 'S', 'Wallace', '987654321', '1941-06-20', '291 Berry, Bellaire, TX', 'F', 43000, '888665555', 4)
INSERT INTO EMPLOYEE VALUES ('Alicia', 'J', 'Zelaya', '999887777', '1968-01-19', '3321 Castle, Spring, TX', 'F', 25000, '987654321', 4)
INSERT INTO EMPLOYEE VALUES ('John', 'B', 'Smith', '123456789', '1965-01-09', '731 Fondren, Houston, TX', 'M', 30000, '333445555', 5)
INSERT INTO EMPLOYEE VALUES ('Ramesh', 'K', 'Narayan', '666884444', '1962-09-15', '975 Fire Oak, Humble, TX', 'M', 38000, '333445555', 5)
INSERT INTO EMPLOYEE VALUES ('Joyce', 'A', 'English', '453453453', '1972-07-31', '5631 Rice, Houston, TX', 'F', 25000, '333445555', 5)
INSERT INTO EMPLOYEE VALUES ('Ahmad', 'V', 'Jabbar', '987987987', '1969-03-29', '980 Dallas, Houston, TX', 'M', 25000, '987654321', 4)






INSERT INTO DEPT_LOCATIONS VALUES ('1', 'Houston')
INSERT INTO DEPT_LOCATIONS VALUES ('4', 'Stafford')
INSERT INTO DEPT_LOCATIONS VALUES ('5', 'Bellaire')
INSERT INTO DEPT_LOCATIONS VALUES ('5', 'Sugarland')
INSERT INTO DEPT_LOCATIONS VALUES ('5', 'Houston')

INSERT INTO WORKS_ON VALUES ('123456789', '1', '32.5')
INSERT INTO WORKS_ON VALUES ('123456789', '2', '7.5')
INSERT INTO WORKS_ON VALUES ('666884444', '3', '40.0')
INSERT INTO WORKS_ON VALUES ('453453453', '1', '20.0')
INSERT INTO WORKS_ON VALUES ('453453453', '2', '20.0')
INSERT INTO WORKS_ON VALUES ('333445555', '2', '10.0')
INSERT INTO WORKS_ON VALUES ('333445555', '3', '10.0')
INSERT INTO WORKS_ON VALUES ('333445555', '10', '10.0')
INSERT INTO WORKS_ON VALUES ('333445555', '20', '10.0')
INSERT INTO WORKS_ON VALUES ('999887777', '30', '30.0')
INSERT INTO WORKS_ON VALUES ('999887777', '10', '10.0')
INSERT INTO WORKS_ON VALUES ('987987987', '10', '35.0')
INSERT INTO WORKS_ON VALUES ('987987987', '30', '5.0')
INSERT INTO WORKS_ON VALUES ('987654321', '30', '20.0')
INSERT INTO WORKS_ON VALUES ('987654321', '20', '15.0')
INSERT INTO WORKS_ON VALUES ('888665555', '20', NULL)

INSERT INTO PROJECT VALUES ('ProductX', '1', 'Bellaire', '5')
INSERT INTO PROJECT VALUES ('ProductY', '2', 'Sugarland', '5')
INSERT INTO PROJECT VALUES ('ProductZ', '3', 'Houston', '5')
INSERT INTO PROJECT VALUES ('Computerization', '10', 'Stafford', '4')
INSERT INTO PROJECT VALUES ('Reorganization', '20', 'Houston', '1')
INSERT INTO PROJECT VALUES ('Newbenefits', '30', 'Staford', '4')

INSERT INTO DEPENDENTE VALUES ('333445555', 'Alice', 'F', '1986-04-05', 'Daughter')
INSERT INTO DEPENDENTE VALUES ('333445555', 'Theodore', 'M', '1983-10-25', 'Son')
INSERT INTO DEPENDENTE VALUES ('333445555', 'Joy', 'F', '1958-05-03', 'Spouse')
INSERT INTO DEPENDENTE VALUES ('987654321', 'Abner', 'M', '1942-02-28', 'Spouse')
INSERT INTO DEPENDENTE VALUES ('123456789', 'Michael', 'M', '1988-01-04', 'Son')
INSERT INTO DEPENDENTE VALUES ('123456789', 'Alice', 'F', '1988-12-30', 'Daughter')
INSERT INTO DEPENDENTE VALUES ('123456789', 'Elizabeth', 'F', '1967-05-05', 'Spouse')

INSERT INTO TASK VALUES ('Design', 'John', '123456789', 1)
INSERT INTO TASK VALUES ('Construction', 'John', '123456789', 4)
INSERT INTO TASK VALUES ('Test', 'Alicia', '999887777', 1)
INSERT INTO TASK VALUES ('Implementation', 'James', '888665555', 1)
INSERT INTO TASK VALUES ('UAT', 'Joyce', '453453453', 1)


INSERT INTO PROJECT_TASK VALUES ('Design', 10)
INSERT INTO PROJECT_TASK VALUES ('Construction', 10)
INSERT INTO PROJECT_TASK VALUES ('Test', 10)
INSERT INTO PROJECT_TASK VALUES ('Implementation', 10)
INSERT INTO PROJECT_TASK VALUES ('UAT', 10)


SELECT Fname, Minit, LName FROM EMPLOYEE WHERE Salary > 25000

SELECT ID FROM TASK WHERE Duration=1

SELECT E.Fname, E.Lname, P.Pname, W.HoursW
FROM EMPLOYEE AS E, PROJECT AS P, WORKS_ON AS W
WHERE P.Pnumber=W.Pno AND W.Essn = E.Ssn
GROUP BY E.Lname, E.Fname, P.Pname, W.HoursW


SELECT T.Fname, T.Lname, T.CounterW
FROM (SELECT E.Fname, E.LName, COUNT(W.Essn) AS CounterW
FROM EMPLOYEE AS E, WORKS_ON AS W
WHERE E.Ssn=W.Essn
GROUP BY E.Lname, E.Fname) AS T
WHERE T.CounterW>2

SELECT DISTINCT E.Fname, E.LName
From EMPLOYEE AS E, DEPENDENTE AS D
WHERE NOT(D.Essn = E.Ssn)
