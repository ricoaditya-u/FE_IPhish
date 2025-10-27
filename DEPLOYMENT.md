# Panduan Deploy Gophish Frontend ke VPS Menggunakan Docker

## Prasyarat

1. VPS dengan sistem operasi Linux (Ubuntu/Debian recommended)
2. Docker dan Docker Compose terinstall di VPS
3. Akses SSH ke VPS

## Persiapan VPS

### 1. Install Docker di VPS

```bash
# Update sistem
sudo apt update

# Install dependencies
sudo apt install -y apt-transport-https ca-certificates curl gnupg lsb-release

# Add Docker repository
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Tambahkan user ke docker group (opsional, untuk menjalankan docker tanpa sudo)
sudo usermod -aG docker $USER
newgrp docker
```

### 2. Install Docker Compose (jika belum menggunakan plugin)

```bash
sudo apt install docker-compose
```

## Deploy Aplikasi

### Metode 1: Menggunakan Docker Compose (Recommended)

1. **Upload project ke VPS**
   ```bash
   # Dari local machine, gunakan scp atau rsync
   scp -r . user@your-vps-ip:/home/user/gophish-fe
   
   # Atau clone dari repository
   git clone <repository-url> /home/user/gophish-fe
   ```

2. **SSH ke VPS**
   ```bash
   ssh user@your-vps-ip
   cd /home/user/gophish-fe
   ```

3. **Build dan jalankan container**
   ```bash
   # Build image
   docker-compose build
   
   # Jalankan container
   docker-compose up -d
   
   # Cek status
   docker-compose ps
   ```

4. **Akses aplikasi**
   - Buka browser: `http://your-vps-ip:3000`

### Metode 2: Menggunakan Docker langsung

1. **Build Docker image**
   ```bash
   docker build -t gophish-frontend .
   ```

2. **Jalankan container**
   ```bash
   docker run -d -p 3000:80 --name gophish-fe gophish-frontend
   ```

3. **Cek status**
   ```bash
   docker ps
   docker logs gophish-fe
   ```

## Konfigurasi Nginx sebagai Reverse Proxy (Opsional)

Jika ingin menggunakan domain dengan SSL:

1. Install Nginx di VPS
   ```bash
   sudo apt install nginx certbot python3-certbot-nginx
   ```

2. Buat konfigurasi di `/etc/nginx/sites-available/gophish-fe`
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
   
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

3. Enable konfigurasi
   ```bash
   sudo ln -s /etc/nginx/sites-available/gophish-fe /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

4. Setup SSL dengan Let's Encrypt
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

## Update Aplikasi

Untuk update aplikasi setelah perubahan kode:

### Cara 1: Menggunakan Script (Paling Mudah)

**Windows:**
```bash
.\rebuild.bat
```

**Linux/Mac:**
```bash
chmod +x rebuild.sh
./rebuild.sh
```

**Fresh rebuild (tanpa cache):**
```bash
./rebuild.sh --no-cache  # Linux/Mac
.\rebuild.bat --no-cache # Windows
```

### Cara 2: Menggunakan Docker Compose

```bash
# Pull latest changes
git pull

# Rebuild dan restart
docker-compose down
docker-compose build
docker-compose up -d

# Atau dalam satu command
docker-compose up -d --build
```

### Cara 3: Menggunakan Docker langsung

```bash
# Stop dan hapus container lama
docker stop gophish-fe
docker rm gophish-fe

# Build ulang
docker build -t gophish-frontend .

# Jalankan container baru
docker run -d -p 3000:80 --name gophish-fe gophish-frontend
```

### Cara 4: Build tanpa cache (clean build)

```bash
# Dengan docker-compose
docker-compose build --no-cache
docker-compose up -d

# Atau dengan docker build
docker build --no-cache -t gophish-frontend .
```

## Perintah Berguna

```bash
# Lihat log
docker-compose logs -f

# Restart container
docker-compose restart

# Stop container
docker-compose down

# Hapus semua (container + volume)
docker-compose down -v

# Masuk ke container
docker exec -it gophish-fe sh
```

## Troubleshooting

### Port sudah digunakan
Jika port 3000 sudah digunakan, edit `docker-compose.yml`:
```yaml
ports:
  - "8080:80"  # Ganti 3000 dengan port lain
```

### Permission denied
```bash
sudo chown -R $USER:$USER .
sudo chmod -R 755 .
```

### Build gagal
```bash
# Clear docker cache
docker system prune -a

# Rebuild tanpa cache
docker-compose build --no-cache
```

## Production Checklist

- [ ] Setup domain dan DNS
- [ ] Setup SSL certificate
- [ ] Konfigurasi firewall (allow port 80, 443, 22)
- [ ] Setup monitoring
- [ ] Setup backup strategy
- [ ] Konfigurasi environment variables
- [ ] Enable auto-restart on reboot

## Environment Variables

Jika butuh environment variables, buat file `.env` dan tambahkan di `docker-compose.yml`:

```yaml
services:
  gophish-fe:
    env_file:
      - .env
```

## Referensi

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Nginx Documentation](https://nginx.org/en/docs/)

