y-----------Server---------------
npm init -y
npm install express morgan cors nodemon bcryptjs jsonwebtoken

npm install prisma
npx prisma init
npm install @prisma/client

// Doc ใช้ในการสร้างและอัพเดตฐานข้อมูล
npx prisma migrate dev --name ecom

// อัพเดต Prisma schema
npx prisma migrate dev


// Reset database - Prisma
npm run resetDB
npx prisma migrate dev
npm run seed


------------Client--------------
npm create vite@latest
or
npm create vite@latest .
- client
- javascript

>cd client
>npm install
>npm run dev


npm i react-router-dom
npm i axios
npm i zustand axios

npm i react-image-file-resizer
npm i react-toastify
npm i react-icons
npm i lucide-react
npm i lodash
npm i rc-slider
npm i numeral
npm install moment
--------------------------