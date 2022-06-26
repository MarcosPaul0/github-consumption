-- TABELA DE USUÁRIOS
CREATE TABLE IF NOT EXISTS public.users
(
    id text NOT NULL PRIMARY KEY,
    login character varying(50) NOT NULL,
    name character varying(255),
    avatar_url character varying(255) NOT NULL,
    html_url character varying(255) NOT NULL,
    url text NOT NULL,
    site_admin boolean NOT NULL,
    bio text,
    location text,
    type "UserType" NOT NULL,
    created_at timestamp(3) without time zone NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
)

-- TABELA DE SEGUIDORES
CREATE TABLE IF NOT EXISTS public.followers
(
    id text NOT NULL PRIMARY KEY,
    follower_id text NOT NULL,
    following_id text NOT NULL,
    UNIQUE (follower_id, following_id),
    FOREIGN KEY (follower_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    FOREIGN KEY (following_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
)

-- TABELA DE LICENSAS
CREATE TABLE IF NOT EXISTS public.licenses
(
    id text NOT NULL PRIMARY KEY,
    name character varying(255) NOT NULL,
    key character varying(30) NOT NULL,
    url text NOT NULL,
)

-- TABELA DE REPOSITÓRIOS
CREATE TABLE IF NOT EXISTS public.repositories
(
    id text NOT NULL PRIMARY KEY,
    name character varying(30) NOT NULL,
    full_name character varying(60) NOT NULL,
    language character varying(30) NOT NULL,
    has_issues boolean NOT NULL,
    forks_count integer NOT NULL,
    open_issues_count integer NOT NULL,
    watchers_count integer NOT NULL,
    is_template boolean NOT NULL,
    private boolean NOT NULL,
    html_url text NOT NULL,
    description text NOT NULL,
    fork boolean NOT NULL,
    url text NOT NULL,
    size integer NOT NULL,
    created_at timestamp(3) without time zone NOT NULL,
    updated_at timestamp(3) without time zone NOT NULL,
    pushed_at timestamp(3) without time zone NOT NULL,
    owner_id text NOT NULL,
    license_id text,
    UNIQUE (owner_id, name),
    FOREIGN KEY (license_id)
        REFERENCES public.licenses (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    FOREIGN KEY (owner_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
)

-- TABELA DE FREQÊNCIA DE CÓDIGO
CREATE TABLE IF NOT EXISTS public.code_frequency
(
    id text NOT NULL PRIMARY KEY,
    date timestamp(3) without time zone NOT NULL,
    additions integer NOT NULL,
    deletions integer NOT NULL,
    repo_id text NOT NULL,
    FOREIGN KEY (repo_id)
        REFERENCES public.repositories (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
)

-- TABELA DE COLABORADORES
CREATE TABLE IF NOT EXISTS public.collaborators
(
    id text NOT NULL PRIMARY KEY,
    user_id text NOT NULL,
    repo_id text NOT NULL,
    UNIQUE (user_id, repo_id),
    FOREIGN KEY (repo_id)
        REFERENCES public.repositories (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE RESTRICT
)
