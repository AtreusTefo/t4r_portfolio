# Portfolio Website with Supabase Integration

A modern, responsive portfolio website built with HTML, CSS, JavaScript, and integrated with Supabase for backend functionality.

## Features

### Frontend
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Interactive Elements**: Dynamic project cards, contact forms, and admin panel
- **Performance Optimized**: Fast loading with optimized assets

### Backend (Supabase Integration)
- **Contact Form**: Save form submissions to database
- **Project Management**: CRUD operations for portfolio projects
- **Real-time Data**: Automatic synchronization between database and UI
- **Secure**: Row Level Security (RLS) policies protect your data

## Quick Start

### 1. Clone and Setup
```bash
git clone <your-repo-url>
cd t4r_portfolio
npm install
```

### 2. Run Locally
```bash
npm run dev
```
This will start a local development server at `http://localhost:3000`

### 3. Deploy to Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `./`
4. Deploy!

## Supabase Integration

### Option 1: Use Without Database (Default)
The portfolio works perfectly without Supabase. All functionality runs locally:
- Contact form shows success messages
- Projects are managed through the admin panel
- Data persists during the session

### Option 2: Connect to Supabase Database

#### Step 1: Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create an account
2. Create a new project
3. Note your Project URL and Anon Key

#### Step 2: Set Up Database
1. In Supabase dashboard, go to SQL Editor
2. Copy and run the SQL from `database/schema.sql`
3. This creates tables for projects, contact submissions, skills, and experiences

#### Step 3: Configure Credentials
1. Open `js/supabase-config.js`
2. Replace placeholder values:
   ```javascript
   const SUPABASE_CONFIG = {
       url: 'https://your-project-ref.supabase.co',
       anonKey: 'your-anon-key-here',
       enabled: true  // Set to true to enable Supabase
   };
   ```

#### Step 4: Test Connection
1. Refresh your portfolio
2. Check browser console for "Supabase connected successfully!"
3. Submit contact form to test database integration

## File Structure

```
t4r_portfolio/
├── index.html              # Main portfolio page
├── projects.html           # Projects showcase page
├── css/                    # Stylesheets
├── js/
│   ├── supabase-config.js  # Supabase configuration
│   └── portfolio-supabase.js # Supabase integration logic
├── images/                 # Image assets
├── documents/              # CV and documents
├── database/
│   └── schema.sql          # Database schema for Supabase
├── package.json            # Dependencies and scripts
├── SUPABASE_SETUP.md       # Detailed Supabase setup guide
└── README.md               # This file
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run start` - Start production server
- `npm run build` - Build for production (static files)

## Customization

### Personal Information
1. Update hero section in `index.html`
2. Replace profile images in `images/` folder
3. Update CV in `documents/` folder
4. Modify social media links in footer

### Styling
1. Colors and fonts are defined in the `<style>` section of `index.html`
2. Uses Tailwind CSS for responsive design
3. Custom CSS for animations and special effects

### Projects
1. **Without Supabase**: Edit the `projects` array in `index.html`
2. **With Supabase**: Use the admin panel or directly edit the database

## Admin Panel

### Access
1. Click "Admin Login" in the navigation
2. Default credentials (change these!):
   - Username: `admin`
   - Password: `password123`

### Features
- Add new projects
- Edit existing projects
- Delete projects
- Upload project images
- Manage project technologies

## Database Schema

### Tables Created
- **projects**: Portfolio projects with title, description, technologies, links
- **contact_submissions**: Contact form submissions
- **skills**: Technical skills with proficiency levels
- **experiences**: Work experience entries

### Security
- Row Level Security (RLS) enabled
- Public read access for projects and skills
- Contact form submissions allowed for everyone
- Admin operations require authentication

## Deployment

### Netlify (Recommended)
1. Connect GitHub repository
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `./`
3. Environment variables (if using Supabase):
   - `SUPABASE_URL`: Your project URL
   - `SUPABASE_ANON_KEY`: Your anon key

### Other Platforms
- **Vercel**: Works out of the box
- **GitHub Pages**: Static hosting, perfect for this project
- **Firebase Hosting**: Easy deployment with CLI

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+), Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Authentication, APIs)
- **Icons**: Font Awesome
- **Development**: Node.js, Live Server
- **Deployment**: Netlify, Vercel, GitHub Pages

## Troubleshooting

### Common Issues

1. **Supabase not connecting**
   - Check credentials in `supabase-config.js`
   - Verify project URL format
   - Check browser console for errors

2. **Contact form not working**
   - Ensure database schema is set up
   - Check RLS policies
   - Verify table permissions

3. **Admin panel not accessible**
   - Check login credentials
   - Ensure JavaScript is enabled
   - Check browser console for errors

### Getting Help

- Check browser console for error messages
- Review `SUPABASE_SETUP.md` for detailed setup instructions
- Visit [Supabase Documentation](https://supabase.com/docs)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own portfolio!

## Support

If you find this project helpful, please give it a star ⭐ on GitHub!