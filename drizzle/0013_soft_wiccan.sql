ALTER TABLE `jobs_Document` DROP FOREIGN KEY `jobsDocument_jobId_jobs_id_fk`;
ALTER TABLE `jobs_Qualification` DROP FOREIGN KEY `jobsQualification_jobId_jobs_id_fk`;
ALTER TABLE `jobs_Responsibility` DROP FOREIGN KEY `jobsResponsibility_jobId_jobs_id_fk`;
RENAME TABLE `jobsDocument` TO `jobs_Document`;
RENAME TABLE `jobsQualification` TO `jobs_Qualification`;
RENAME TABLE `jobsResponsibility` TO `jobs_Responsibility`;
ALTER TABLE `jobs_Document` ADD CONSTRAINT `jobs_Document_jobId_jobs_id_fk` FOREIGN KEY (`jobId`) REFERENCES `jobs`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `jobs_Qualification` ADD CONSTRAINT `jobs_Qualification_jobId_jobs_id_fk` FOREIGN KEY (`jobId`) REFERENCES `jobs`(`id`) ON DELETE no action ON UPDATE no action;
ALTER TABLE `jobs_Responsibility` ADD CONSTRAINT `jobs_Responsibility_jobId_jobs_id_fk` FOREIGN KEY (`jobId`) REFERENCES `jobs`(`id`) ON DELETE no action ON UPDATE no action;