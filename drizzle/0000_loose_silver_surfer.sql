CREATE TABLE `products` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`category` text NOT NULL,
	`code` text NOT NULL,
	`material` text NOT NULL,
	`dimensions` text NOT NULL,
	`description` text NOT NULL,
	`image_url` text NOT NULL,
	`featured` integer DEFAULT 0 NOT NULL,
	`sort_order` integer DEFAULT 0 NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `site_settings` (
	`id` integer PRIMARY KEY NOT NULL,
	`site_title` text NOT NULL,
	`hero_kicker` text NOT NULL,
	`hero_title` text NOT NULL,
	`hero_description` text NOT NULL,
	`hero_image_url` text NOT NULL,
	`about_text` text NOT NULL,
	`phone` text NOT NULL,
	`email` text NOT NULL,
	`address` text NOT NULL,
	`updated_at` integer NOT NULL
);
