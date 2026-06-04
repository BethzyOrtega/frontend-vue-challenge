import { reactive } from 'vue'

export const usePersonalDataValidation = () => {
  const errors = reactive({
    fullname: '',
    documentType: '',
    documentNumber: '',
    phone: '',
    birthDate: '',
    acceptTerms: '',
    acceptPrivacy: '',
    
  })

  const isAdult = (birthDate: string) => {
    const birth = new Date(birthDate)
    const today = new Date()

    let age = today.getFullYear() - birth.getFullYear()

    const monthDiff = today.getMonth() - birth.getMonth()

    if (
      monthDiff < 0
      || (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--
    }

    return age >= 18
  }

  const validateFullname = (value: string) => {
    if (!value.trim()) {
      errors.fullname = 'Ingrese sus nombres y apellidos'
      return false
    }

    errors.fullname = ''
    return true
  }

  const validateDocumentType = (value: string) => {
    if (!value) {
      errors.documentType = 'Seleccione un tipo de documento'
      return false
    }

    errors.documentType = ''
    return true
  }

  const validateDocumentNumber = (
    documentType: string,
    documentNumber: string,
  ) => {
    if (!documentNumber) {
      errors.documentNumber = 'Ingrese un número de documento'
      return false
    }

    switch (documentType) {
      case 'DNI':
        if (!/^\d{8}$/.test(documentNumber)) {
          errors.documentNumber = 'El DNI debe tener 8 dígitos'
          return false
        }
        break

      case 'CE':
        if (!/^\d{9}$/.test(documentNumber)) {
          errors.documentNumber = 'El CE debe tener 9 dígitos'
          return false
        }
        break

      case 'Pasaporte':
        if (
          documentNumber.length < 8
          || documentNumber.length > 15
        ) {
          errors.documentNumber =
            'El pasaporte debe tener entre 8 y 15 caracteres'
          return false
        }
        break
    }

    errors.documentNumber = ''
    return true
  }

  const validatePhone = (value: string) => {
    if (!value) {
      errors.phone = 'Ingrese su celular'
      return false
    }

    if (!/^\d{9}$/.test(value)) {
      errors.phone = 'El celular debe tener 9 dígitos'
      return false
    }

    errors.phone = ''
    return true
  }

  const validateBirthDate = (value: string) => {
    if (!value) {
      errors.birthDate = 'Seleccione una fecha'
      return false
    }

    if (!isAdult(value)) {
      errors.birthDate = 'Debe ser mayor de edad'
      return false
    }

    errors.birthDate = ''
    return true
  }

  const validateTerms = (value: boolean) => {
    errors.acceptTerms = value
      ? ''
      : 'Debe aceptar los términos y condiciones'

    return value
  }

  const validatePrivacy = (value: boolean) => {
    errors.acceptPrivacy = value
      ? ''
      : 'Debe aceptar la política de privacidad'

    return value
  }

  const validateForm = (form: any) => {
    const validations = [
      validateFullname(form.fullname),
      validateDocumentType(form.documentType),
      validateDocumentNumber(
        form.documentType,
        form.documentNumber,
      ),
      validatePhone(form.phone),
      validateBirthDate(form.birthDate),
      validateTerms(form.acceptTerms),
      validatePrivacy(form.acceptPrivacy),
    ]

    return validations.every(Boolean)
  }

  return {
    errors,
    validateForm,
    validateFullname,
    validateDocumentType,
    validateDocumentNumber,
    validatePhone,
    validateBirthDate,
    validateTerms,
    validatePrivacy,
  }
}