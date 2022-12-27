/* Replace with your SQL commands */
CREATE TYPE STATUS AS ENUM ('todo', 'doing', 'done');
CREATE TABLE IF NOT EXISTS todos (
    id serial PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content VARCHAR(255) NOT NULL,
    status STATUS DEFAULT 'todo' NOT NULL,
    remove BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);
