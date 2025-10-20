export default class PouchDBManager {
  constructor() {
    // No necesitamos inicializar PouchDB
    console.log('✅ Autoguardado con localStorage activado');
  }

  async saveDiagram(diagramData) {
    try {
      const datosGuardar = {
        data: diagramData,
        savedAt: new Date().toISOString()
      };
      
      localStorage.setItem('flowchart-current-diagram', JSON.stringify(datosGuardar));
      console.log('💾 Diagrama guardado automáticamente');
      return { ok: true };
    } catch (error) {
      console.error('Error al guardar diagrama:', error);
      return { ok: false, error };
    }
  }

  async loadDiagram() {
    try {
      const datosGuardados = localStorage.getItem('flowchart-current-diagram');
      if (datosGuardados) {
        const parsed = JSON.parse(datosGuardados);
        console.log('📂 Diagrama cargado desde autoguardado');
        return parsed.data;
      }
      console.log('No hay diagrama guardado aún');
      return null;
    } catch (error) {
      console.log('Error cargando autoguardado:', error);
      return null;
    }
  }

  async clearDiagram() {
    try {
      localStorage.removeItem('flowchart-current-diagram');
      console.log('🗑️ Autoguardado limpiado');
      return { ok: true };
    } catch (error) {
      console.error('Error limpiando autoguardado:', error);
      return { ok: false, error };
    }
  }
}