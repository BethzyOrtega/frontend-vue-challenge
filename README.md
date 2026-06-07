# Kambista - Frontend Vue Challenge

Este repositorio contiene el frontend del desafío técnico de Kambista, construido con Nuxt 3 y TypeScript. Incluye formularios de autenticación y onboarding, componentes reutilizables y mocks para datos locales.

## Despliegue

La app está desplegada en Netlify en:

- https://kambeth.netlify.app/login


### Credenciales de demo

Para facilitar pruebas, la aplicación acepta las siguientes credenciales de demo en el formulario de login:

- Correo: `demo@kambista.com`
- Contraseña: `123456`

## Tecnologías

- Nuxt 4
- Vue 3 + Composition API
- TypeScript
- Tailwind CSS
- Vite / esbuild (según configuración)

## Requisitos

- Node.js 18 o superior
- npm o pnpm

## Instalación

1. Clona el repositorio:

```bash
git clone <repo-url>
cd frontend-vue-challenge
```

2. Instala dependencias:

```bash
npm install
# o
pnpm install
```

## Desarrollo

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre http://localhost:3000 (o la URL que indique Nuxt) para ver la aplicación.

## Scripts útiles

- `npm run dev` - inicia el servidor en modo desarrollo
- `npm run build` - compila la aplicación para producción
- `npm run preview` - sirve la versión compilada localmente

## Estructura del proyecto (resumen)

- `app/` - archivos principales de la app (pages, components, layouts, assets)
	- `components/` - componentes reutilizables, p.ej. `ui/`, `forms/`, `onboarding/`
	- `pages/` - rutas de la aplicación (p.ej. `login.vue`)
	- `assets/` - imágenes, estilos y recursos estáticos
- `mocks/` - datos JSON de ejemplo para pruebas y desarrollo
- `public/` - archivos estáticos servidos tal cual
- `nuxt.config.ts` - configuración del proyecto
- `package.json` - scripts y dependencias

### Estructura completa del proyecto

```
app/
	app.vue
	components/
		ui/
			AppButton.vue
			AppInput.vue
			AppSelect.vue
			AppTerms.vue
		forms/
			LoginForm.vue
			RegisterForm.vue
		onboarding/
			PersonalDataForm.vue
			RegistrationSucces.vue
		account/
			AccountsModal.vue
			AccountSelector.vue
			AccountDrawer.vue
		exchange/
			ExchangeTabs.vue
			ExchangeAmountCard.vue
	pages/
		login.vue
		onboarding/
			index.vue
			success.vue
		transactions/
			index.vue
			transfer-data-operation.vue
			success.vue
			send-proof.vue
			regala-y-gana.vue
			kambista-beneficios.vue
			kambi-koinks.vue
			historial.vue
			cuentas-bancarias.vue
			complete-data-operation.vue
			ayuda.vue
			alerta-tipo-cambio.vue
	layouts/
		Calculator.vue
		CompleteFormOperation.vue
		HeaderOperations.vue
		HeaderPage.vue
		OperationStepper.vue
		Sidebar.vue
	middleware/
		auth.global.ts
		transaction.ts
	composables/
		useExchange.ts
		useLoginValidation.ts
		usePersonalDataValidation.ts
		useValidationDataOperation.ts
		useValidateDataDrawer.ts
	stores/
		onboarding.ts
		dataTransfer.ts
		dataCalculator.ts
	types/
		account.ts
	constants.ts
	app.vue
assets/
	images/
		home_desk.png
		banner_succes.png
		coupon_calculator.png
		img_tranfer.png
		logo_Kambista.png
		send_proof.png
		success_img.png
		celphone.png
	icons/
		coin.png
		eye_close.png
		eye_open.png
		start_mssg.png
		swith.png
mocks/
	bankAccounts.json
	sourceFunds.json
	menuNav.json
public/
	robots.txt
	favicon.ico
nuxt.config.ts
package.json
package-lock.json
tsconfig.json
.gitignore
README.md
```

## Componentes y comportamiento relevantes

- `AppTerms.vue` - componente con checkboxes para términos y política de privacidad. Muestra errores y estilos de foco.
- `LoginForm.vue` - formulario de autenticación usado en `pages/login.vue`.
- `PersonalDataForm.vue` - formulario de onboarding con validaciones y uso de `AppTerms`.

## Validación y estado

La validación de `PersonalDataForm` se realiza en `app/composables/usePersonalDataValidation.ts`. El estado de onboarding se gestiona mediante `stores/onboarding.js`.


## Funcionalidades pendientes

Hay algunas pantallas y flujos aún pendientes de implementación o por completar:

- Registro de usuarios (`RegisterForm.vue` y flujo de registro completo).
- Recuperación de contraseña / "Olvidé mi contraseña" (email de restablecimiento y UI).
- Verificación de email (enviar y validar código/ enlace).

Estas funcionalidades están marcadas como tareas futuras y pueden implementarse conectando los formularios existentes con los endpoints apropiados y añadiendo los flujos de UI necesarios.

