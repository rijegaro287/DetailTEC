go 
use DetailTEC
go

if EXISTS (
    SELECT *
    FROM sys.objects 
    where type = "P" and name = "staffReport"
)
DROP PROCEDURE staffReport

GO

if EXISTS (
    SELECT *
    FROM sys.objects 
    where type = "P" and name = "washingReport"
)
DROP PROCEDURE washingReport

GO

if EXISTS (
    SELECT *
    FROM sys.objects 
    where type = "P" and name = "pointsReport"
)
DROP PROCEDURE pointsReport

GO


