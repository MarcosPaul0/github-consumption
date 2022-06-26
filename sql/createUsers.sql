-- GRUPO DE USUÁRIOS
-- grupo que gerencia o banco de dados
CREATE GROUP adm_group;

-- grupo que preenche o banco de dados com os dados da api do github
CREATE GROUP fill_group;

-- grupo que somente visualiza os dados do banco de dados
CREATE GROUP dev_group;

-- PERMISSÕES
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO adm_group;

GRANT SELECT, INSERT ON ALL TABLES IN SCHEMA public TO fill_group;

GRANT SELECT ON ALL TABLES IN SCHEMA public TO dev_group;

-- USUÁRIOS DO BANCO DE DADOS
CREATE USER adm_user WITH PASSWORD '123' IN GROUP adm_group;

CREATE USER fill_user WITH PASSWORD '123' IN GROUP fill_group;

CREATE USER dev_user WITH PASSWORD '123' IN GROUP dev_group;

