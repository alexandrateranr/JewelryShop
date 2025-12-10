# Custom Domain Setup Guide

## Step 1: Purchase a Domain (if you don't have one)

Recommended domain registrars:
- **Namecheap** (https://www.namecheap.com) - Popular, affordable
- **Google Domains** (https://domains.google) - Simple interface
- **Cloudflare** (https://www.cloudflare.com/products/registrar) - Good pricing
- **GoDaddy** (https://www.godaddy.com) - Widely used

Popular domain suggestions for your jewelry shop:
- `gemgarden.com`
- `gemgardenjewelry.com`
- `alexandrajewelry.com`
- `luxurygemgarden.com`

## Step 2: Configure DNS Settings

After purchasing your domain, configure DNS records:

### Option A: Using Apex Domain (yourdomain.com)

Add these **A records** in your DNS settings:
```
Type: A
Name: @
Value: 185.199.108.153
TTL: 3600

Type: A
Name: @
Value: 185.199.109.153
TTL: 3600

Type: A
Name: @
Value: 185.199.110.153
TTL: 3600

Type: A
Name: @
Value: 185.199.111.153
TTL: 3600
```

### Option B: Using www Subdomain (www.yourdomain.com)

Add this **CNAME record**:
```
Type: CNAME
Name: www
Value: alexandrateranr.github.io
TTL: 3600
```

### Option C: Using Both (Recommended)

Add both A records (for apex) and CNAME (for www) as shown above.

## Step 3: Update CNAME File

1. Edit `public/CNAME` file
2. Replace `yourdomain.com` with your actual domain
3. If you want both www and non-www, use:
   ```
   yourdomain.com
   www.yourdomain.com
   ```
   Or just one:
   ```
   yourdomain.com
   ```

## Step 4: Configure in GitHub

1. Go to your repository: https://github.com/alexandrateranr/JewelryShop
2. Click **Settings** → **Pages**
3. Under **Custom domain**, enter your domain (e.g., `yourdomain.com`)
4. Check **Enforce HTTPS** (recommended)
5. Save

## Step 5: Commit and Push

After updating the CNAME file:
```bash
git add public/CNAME
git commit -m "Add custom domain configuration"
git push origin main
```

## Step 6: Wait for DNS Propagation

DNS changes can take 24-48 hours to propagate, but usually work within a few hours.

## Verify Your Setup

1. Check DNS propagation: https://www.whatsmydns.net
2. Test your domain: Visit `http://yourdomain.com` (HTTPS will be enabled automatically by GitHub)

## Troubleshooting

- **Domain not working?** Wait 24-48 hours for DNS propagation
- **SSL Certificate issues?** GitHub automatically provides SSL certificates, but it may take a few hours after domain configuration
- **CNAME file not working?** Make sure the file is in the `public/` folder and contains only your domain name(s)

## Free Domain Options

If you want a free subdomain:
- **Freenom** (https://www.freenom.com) - Free .tk, .ml, .ga domains
- **GitHub Pages** - Already provides free subdomain: `alexandrateranr.github.io/JewelryShop`

