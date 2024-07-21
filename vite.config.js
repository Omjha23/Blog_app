// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   server:{
//     proxy:{
//       '/api':'http://localhost:4000/'
//     },
//   },
//   plugins: [react()],
// })
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      // '/api':'https://blog-app-sny5.onrender.com'
       '/api':'http://localhost:5000/'
    },
  },
  plugins: [react()],
})