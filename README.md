# Prueba Técnica – Zitro 🎮

## 🚀 Escenas del proyecto  

<details>
<summary>1. Splash</summary>

- Contiene una **barra de progreso** implementada con el componente `cc.ProgressBar`.  
- Se ha adaptado un script oficial de Cocos Creator para simular una carga progresiva en función del tiempo definido [Codigo fuente](https://github.com/cocos/cocos-test-projects/blob/v3.8/assets/cases/ui/11.progress/progress.ts).  
- Al finalizar la animación, se carga automáticamente la **escena de Menú**.  

</details>

<details>
<summary>2. Menú</summary>

- Realiza una **petición HTTP** a la API pública [World Time API](https://worldtimeapi.org/) para obtener la hora de Madrid.  
- La primera solución fue hacer una petición en cada `update`, pero la API bloqueaba por exceso de solicitudes.  
- **Solución**:  
  - Se realiza **una única petición inicial** para obtener la hora con precisión de segundos.  
  - A partir de ahí, el tiempo se **incrementa manualmente** en el cliente, evitando sobrecarga de peticiones.  
- Cada vez que se carga la escena, se hace una petición a la API que carga de nuevo la hora inicial.  

</details>

<details>
<summary>3. Quiz</summary>

- Implementado siguiendo un **patrón MVC**:  
  - **Model (QuizModel):** carga los datos desde un JSON.  
  - **View (QuizView):** prepara y muestra las preguntas y respuestas en la UI. Incluye animaciones de **fade in** con `tween`.  
  - **Controller (QuizManager):** gestiona la lógica del juego, validación de respuestas y feedback visual.  
- **Feedback visual:**  
  - Pantalla que se colorea en **verde** si la respuesta es correcta o en **rojo** si es incorrecta.  
  - Al finalizar, se muestra una **pantalla de fin de quiz**.  
- El botón de volver al menú se implementa como un **prefab reutilizable** para futuras escenas.  

</details>

<details>
<summary>4. Slots</summary>

- Assets obtenidos de [Slotopaint](https://slotopaint.artstation.com/), modificados con Photoshop y Paint.NET.  
- Implementación de un **slot machine 3x3**:  
  - La matriz inicial se genera de manera **aleatoria**.  
  - Cada columna tiene su propia animación de giro mediante `tween`.  
  - Se simula el movimiento cambiando sprites de forma aleatoria durante el giro.  
- **Mejoras visuales:**  
  - Fondos y marcos separados de los sprites, ajustando el orden en el canvas. Asi creamos un mejor efecto visual que simula que los sprites vayan rotando hacia abajo.  
  - Las columnas giran de manera secuencial mediante `setTimeout`.  
- **Condición de victoria:**  
  - Si las tres casillas centrales son iguales, se activa una animación de celebración (con animación y sonido).  

</details>

---

## ⚠️ Problemas encontrados  

  - La escena se inicializaba en 3D con cámara ortográfica (usando una plantilla 2D).  
  - La cámara no se ajustaba automáticamente al canvas.  
  - Los archivos JSON deben estar en `assets/resources` para ser cargados dinámicamente.  
  - Algunos ficheros se corrompían al mover scripts entre carpetas (.meta y .ts).  
  - La API de hora puede fallar puntualmente (este error no lo he podido solucionar).  

---
