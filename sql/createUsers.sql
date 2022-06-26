-- grupo que gerencia o banco de dados
CREATE GROUP adm_group;

-- grupo que preenche o banco de dados com os dados da api do github
CREATE GROUP fill_group;

-- grupo que somente visualiza os dados do banco de dados
CREATE GROUP dev_group;

GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO adm_group;

GRANT SELECT, INSERT ON ALL TABLES IN SCHEMA public TO fill_group;

GRANT SELECT ON ALL TABLES IN SCHEMA public TO dev_group;