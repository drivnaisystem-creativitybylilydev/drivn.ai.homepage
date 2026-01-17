# Admin Dashboard Password Protection

## ✅ What's Been Set Up

- Password protection component with branded styling
- Protected routes:
  - `/admin` (CRM Dashboard)
  - `/admin/clients/[id]` (Client Detail Pages)
  - `/admin/emails` (Email Dashboard)
- Session-based authentication (remembers for browser session)
- Branded password prompt matching your website aesthetic

## 🔐 Set Your Password

Add this to your `.env.local` file:

```env
ADMIN_PASSWORD=your_secure_password_here
```

**Important:** 
- Choose a strong password
- Don't commit `.env.local` to git (it's already in .gitignore)
- Default password is `drivn2024` if not set (change this!)

## 🔄 How It Works

1. **First Visit:** When you go to `/admin`, you'll see a branded password prompt
2. **Enter Password:** Type your password and click "Access Dashboard"
3. **Session Memory:** Once authenticated, you stay logged in for the browser session
4. **New Session:** If you close the browser, you'll need to enter the password again

## 🎨 Design Features

- Purple gradient background matching your website
- Branded "Drivn.AI" header
- Smooth animations and transitions
- Error messages for incorrect passwords
- Auto-focus on password field

## 🔒 Security Notes

- Password is checked server-side via API route
- Session stored in browser's sessionStorage (cleared on browser close)
- Password should be strong and unique
- For production, consider adding rate limiting or more advanced auth
