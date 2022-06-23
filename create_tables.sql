ALTER TABLE repositories ADD CONSTRAINT user_repo_unique UNIQUE (owner_id, name);

ALTER TABLE collaborators ADD CONSTRAINT colab_user_repo_unique UNIQUE (user_id, repo_id);

ALTER TABLE followers ADD CONSTRAINT followers_unique UNIQUE (follower_id, following_id);

-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    id text COLLATE pg_catalog."default" NOT NULL,
    login character varying(50) COLLATE pg_catalog."default" NOT NULL,
    name character varying(255) COLLATE pg_catalog."default",
    avatar_url character varying(255) COLLATE pg_catalog."default" NOT NULL,
    html_url character varying(255) COLLATE pg_catalog."default" NOT NULL,
    url text COLLATE pg_catalog."default" NOT NULL,
    site_admin boolean NOT NULL,
    bio text COLLATE pg_catalog."default",
    location text COLLATE pg_catalog."default",
    type "UserType" NOT NULL,
    created_at timestamp(3) without time zone NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;
-- Index: users_login_key

-- DROP INDEX IF EXISTS public.users_login_key;

CREATE UNIQUE INDEX IF NOT EXISTS users_login_key
    ON public.users USING btree
    (login COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: users_url_key

-- DROP INDEX IF EXISTS public.users_url_key;

CREATE UNIQUE INDEX IF NOT EXISTS users_url_key
    ON public.users USING btree
    (url COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;

    -- Table: public.repositories

-- DROP TABLE IF EXISTS public.repositories;

CREATE TABLE IF NOT EXISTS public.repositories
(
    id text COLLATE pg_catalog."default" NOT NULL,
    name character varying(30) COLLATE pg_catalog."default" NOT NULL,
    full_name character varying(60) COLLATE pg_catalog."default" NOT NULL,
    language character varying(30) COLLATE pg_catalog."default" NOT NULL,
    has_issues boolean NOT NULL,
    forks_count integer NOT NULL,
    open_issues_count integer NOT NULL,
    watchers_count integer NOT NULL,
    is_template boolean NOT NULL,
    private boolean NOT NULL,
    html_url text COLLATE pg_catalog."default" NOT NULL,
    description text COLLATE pg_catalog."default" NOT NULL,
    fork boolean NOT NULL,
    url text COLLATE pg_catalog."default" NOT NULL,
    size integer NOT NULL,
    created_at timestamp(3) without time zone NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    pushed_at timestamp(3) without time zone NOT NULL,
    owner_id text COLLATE pg_catalog."default" NOT NULL,
    license_id text COLLATE pg_catalog."default",
    CONSTRAINT repositories_pkey PRIMARY KEY (id),
    CONSTRAINT user_repo_unique UNIQUE (owner_id, name),
    CONSTRAINT repositories_license_id_fkey FOREIGN KEY (license_id)
        REFERENCES public.licenses (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    CONSTRAINT repositories_owner_id_fkey FOREIGN KEY (owner_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.repositories
    OWNER to postgres;


-- Table: public.licenses

-- DROP TABLE IF EXISTS public.licenses;

CREATE TABLE IF NOT EXISTS public.licenses
(
    id text COLLATE pg_catalog."default" NOT NULL,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    key character varying(30) COLLATE pg_catalog."default" NOT NULL,
    url text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT licenses_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.licenses
    OWNER to postgres;

-- Table: public.followers

-- DROP TABLE IF EXISTS public.followers;

CREATE TABLE IF NOT EXISTS public.followers
(
    id text COLLATE pg_catalog."default" NOT NULL,
    follower_id text COLLATE pg_catalog."default" NOT NULL,
    following_id text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT followers_pkey PRIMARY KEY (id),
    CONSTRAINT followers_unique UNIQUE (follower_id, following_id),
    CONSTRAINT followers_follower_id_fkey FOREIGN KEY (follower_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT followers_following_id_fkey FOREIGN KEY (following_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.followers
    OWNER to postgres;

-- Table: public.events

-- DROP TABLE IF EXISTS public.events;

CREATE TABLE IF NOT EXISTS public.events
(
    id text COLLATE pg_catalog."default" NOT NULL,
    type character varying(30) COLLATE pg_catalog."default" NOT NULL,
    public boolean NOT NULL,
    payload jsonb NOT NULL,
    repo_id text COLLATE pg_catalog."default" NOT NULL,
    actor_id text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT events_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.events
    OWNER to postgres;

-- Table: public.collaborators

-- DROP TABLE IF EXISTS public.collaborators;

CREATE TABLE IF NOT EXISTS public.collaborators
(
    id text COLLATE pg_catalog."default" NOT NULL,
    user_id text COLLATE pg_catalog."default" NOT NULL,
    repo_id text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT collaborators_pkey PRIMARY KEY (id),
    CONSTRAINT colab_user_repo_unique UNIQUE (user_id, repo_id),
    CONSTRAINT collaborators_repo_id_fkey FOREIGN KEY (repo_id)
        REFERENCES public.repositories (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT collaborators_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.collaborators
    OWNER to postgres;

-- Table: public.code_frequency

-- DROP TABLE IF EXISTS public.code_frequency;

CREATE TABLE IF NOT EXISTS public.code_frequency
(
    id text COLLATE pg_catalog."default" NOT NULL,
    date timestamp(3) without time zone NOT NULL,
    additions integer NOT NULL,
    deletions integer NOT NULL,
    repo_id text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT code_frequency_pkey PRIMARY KEY (id),
    CONSTRAINT code_frequency_repo_id_fkey FOREIGN KEY (repo_id)
        REFERENCES public.repositories (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.code_frequency
    OWNER to postgres;