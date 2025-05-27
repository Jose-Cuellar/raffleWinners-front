<template>
  <div>
    <p><strong>Nombre de usuario:</strong> {{ user.name }}</p>
    <p><strong>Email:</strong> {{ user.email }}</p>
    <p><strong>Es administrador:</strong> {{ user.is_staff ? 'Sí' : 'No' }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../utils/axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref(JSON.parse(localStorage.getItem('user')) || {})

const logout = async () => {
  try {
    await api.post('/logout/')
    
    localStorage.removeItem('user')
    
    router.push('/login')
  } catch (err) {
    console.error('Error cerrando sesión:', err)
  }
}
</script>
