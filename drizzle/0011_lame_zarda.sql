CREATE TABLE `jobs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`status` enum('draft','published'),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	`deletedAt` timestamp,
	CONSTRAINT `jobs_id` PRIMARY KEY(`id`)
);
CREATE TABLE `jobsDocument` (
	`id` int AUTO_INCREMENT NOT NULL,
	`jobId` int,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`document` varchar(255) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `jobsDocument_id` PRIMARY KEY(`id`)
);
CREATE TABLE `jobsQualification` (
	`id` int AUTO_INCREMENT NOT NULL,
	`jobId` int,
	`qualification` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `jobsQualification_id` PRIMARY KEY(`id`)
);
CREATE TABLE `jobsResponsibility` (
	`id` int AUTO_INCREMENT NOT NULL,
	`jobId` int,
	`responsibility` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `jobsResponsibility_id` PRIMARY KEY(`id`)
);
ALTER TABLE `jobsResponsibility` ADD CONSTRAINT `jobsResponsibility_jobId_jobs_id_fk` FOREIGN KEY (`jobId`) REFERENCES `jobs`(`id`) ON DELETE no action ON UPDATE no action;