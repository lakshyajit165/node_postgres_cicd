 CREATE TABLE "tasks" (
    "id" SERIAL,
    "title" VARCHAR(255),
    "description" VARCHAR(255),
    "created_by" VARCHAR(255),
    "date_created" TIMESTAMP WITH TIME ZONE,
    "date_updated" TIMESTAMP WITH TIME ZONE,
    "completed" BOOLEAN DEFAULT false,
    PRIMARY KEY ("id")
);
