# CarServiceClient por Andrés Pino Vallejo

Para llegar a la solución se crearon los siguientes componentes y servicios:

## Owner service
Es el servicio encargado de proveer los observables para todas las peticiones relacionadas al propietario: obtenerlos todos, obtener por id, crear, actualizar y borrar. También se creó un observable para eliminar varios propietarios a la vez usando el forkJoin de rxjs, el cual permite ejecutar multiples observables asincronamente y esperar a que todos sea resueltos.

## Owner List Component
Es el componente de la lista de propietarios. Como el propietairo tiene varios datos, se despliega la información en una lista para que sea mejor visualizada. Allí se le añadió un checkbox a cada propietario de la lista para poder eliminar multiples propietarios a la vez. También tienen un botón para dirigirse a editar cada propietario o para agregar uno nuevo.

Para ésto se utilizaron los componentes Mat-table y Mat-checkbox de Angular Material.

## Owner Edit Component
Es el componente que permite editar un propietario existente o crear uno nuevo. Con un parámetro a través de la url se obtiene el id del propietario para obtenerlo a través del servicio y poder editarlo. El único campo que se añadió como obligatorio fue el DNI.