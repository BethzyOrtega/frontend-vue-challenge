import { reactive, ref, watch } from 'vue'

export const useLoginValidation = () => {
  const form = reactive({
    email: '',
    password: '',
  })

  const errors = reactive({
    email: '',
    password: '',
  })

  const loginError = ref('')
  const loading = ref(false)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const validateEmail = () => {
    if (!form.email) {
      errors.email = 'El correo es obligatorio'
    }
    else if (!emailRegex.test(form.email)) {
      errors.email = 'Ingrese un correo válido'
    }
    else {
      errors.email = ''
    }
  }

  const validatePassword = () => {
    errors.password = form.password
      ? ''
      : 'La contraseña es obligatoria'
  }

  const validateForm = () => {
    validateEmail()
    validatePassword()

    return !errors.email && !errors.password
  }

  const login = async () => {
    loginError.value = ''

    if (!validateForm()) {
      return false
    }

    loading.value = true

    try {
      
      await new Promise(resolve => setTimeout(resolve, 1000))

        const DEMO_EMAIL = 'demo@kambista.com'
        const DEMO_PASSWORD = '123456'

        if (form.email === DEMO_EMAIL && form.password === DEMO_PASSWORD) {
          return true
        }

        loginError.value = 'Correo o contraseña incorrectos'
        return false
    }
    finally {
      loading.value = false
    }
  }

  watch(() => form.email, validateEmail)
  watch(() => form.password, validatePassword)

  return {
    form,
    errors,
    loginError,
    loading,
    login,
  }
}