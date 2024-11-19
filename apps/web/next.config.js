require('dotenv').config()
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cdn.svgator.com', 'localhost', 'static.vecteezy.com', 'assets.loket.com', 'assets-v2.lottiefiles.com', 'wallpaper.forfun.com', 'rare-gallery.com', 'w7.pngwing.com', 'miro.medium.com', 'networksites.livenationinternational.com', 'tiketevent.com', 'awsimages.detik.net.id', 'staticassets.kiostix.com', 'res.cloudinary.com'],
        formats: ['image/avif', 'image/webp']
    },
};

module.exports = nextConfig;
