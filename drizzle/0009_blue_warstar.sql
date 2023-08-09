CREATE TABLE `businessLine` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`images` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`status` enum('draft','published'),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `businessLine_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `pages` DROP COLUMN `slug`;