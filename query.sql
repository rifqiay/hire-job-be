create table worker(
    id varchar primary key,
    nama varchar(255),
    email varchar(50),
    phone varchar(13),
    sandi varchar,
    job_desc varchar(50),
    domisili varchar(255),
    tempat_kerja varchar(50),
    photo varchar
);

create table skills(
    id varchar primary key,
    nama_skill varchar(50),
    id_worker varchar,
    constraint fk_worker
    foreign key (id_worker)
    references worker(id)
);

create table experience(
    id varchar primary key,
    posisi varchar(20),
    nama_perusahaan varchar(50),
    bulan_tahun varchar(20),
    deskripsi_singkat text,
    id_worker varchar,
    constraint fk_worker
    foreign key (id_worker)
    references worker(id)
);

create table portfolio(
    id varchar primary key,
    nama_app varchar(50),
    link_repository varchar(255),
    type_app varchar(50),
    photo varchar,
    id_worker varchar,
    constraint fk_worker
    foreign key (id_worker)
    references worker(id)
);