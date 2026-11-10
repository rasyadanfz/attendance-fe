# Attendance FE

Repository ini adalah sebuah monorepo yang terdiri atas 2 aplikasi:

- Aplikasi HR Admin
- Aplikasi absensi karyawan

## Cara Menjalankan

### Prerequisite

- Pastikan `Docker` dan `Docker Compose` sudah terinstall
- Pastikan `Aplikasi Backend` sudah berjalan

### Langkah-langkah

1. Clone repository ini
2. Masuk ke folder attendance-fe

```bash
cd attendance-fe
```

3. Copy .env.example ke file .env

```bash
cp .env.example .env
```

4. Start Docker Compose

```bash
docker compose up -d
```

- Aplikasi admin HR tersedia pada `http://localhost:3123`
- Aplikasi karyawan tersedia pada `http://localhost:3124`
- Akun HR
    - email: `hr_admin@company.com`
    - password: `hr_admin_password`
