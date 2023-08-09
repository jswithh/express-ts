CREATE TABLE `course_Benefit` (
	`id` int AUTO_INCREMENT NOT NULL,
	`courseId` int,
	`benefit` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `course_Benefit_id` PRIMARY KEY(`id`)
);
CREATE TABLE `pages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`url` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`seoDescription` text NOT NULL,
	`content` text NOT NULL,
	`status` enum('draft','published'),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `pages_id` PRIMARY KEY(`id`)
);
ALTER TABLE `course_Benefit` ADD CONSTRAINT `course_Benefit_courseId_courses_id_fk` FOREIGN KEY (`courseId`) REFERENCES `courses`(`id`) ON DELETE no action ON UPDATE no action;