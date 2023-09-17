/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:['firebasestorage.googleapis.com','avatars.githubusercontent.com','lh3.googleusercontent.com']
    }
}

module.exports = nextConfig


/*
images:{
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
}
    images:{
        domains:['firebasestorage.googleapis.com','avatars.githubusercontent.com']
    }

*/