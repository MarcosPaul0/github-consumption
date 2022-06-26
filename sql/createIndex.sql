-- como muitas buscas devem ocorrer pelo login do usuário criamos um índice sobre o atributo login que é único na tabela
CREATE INDEX user_login ON public.users USING btree (login);