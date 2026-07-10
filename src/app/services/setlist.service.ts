import { SetListFile, SetListItem } from "../types/setlist";

export class SetListService {
  static async load(file: File): Promise<SetListFile> {
    const text = await file.text();
    return this.parse(text);
  }

  static parse(json: string): SetListFile {
    const data = JSON.parse(json);
    return this.validate(data);
  }

  private static validate(data: unknown): SetListFile {
    if (typeof data !== "object" || data === null) {
      throw new Error("El archivo no contiene un objeto válido.");
    }

    const obj = data as Record<string, unknown>;

    if (typeof obj.version !== "number") {
      throw new Error("Campo 'version' inválido.");
    }

    if (typeof obj.banda !== "string") {
      throw new Error("Campo 'banda' inválido.");
    }

    if (typeof obj.show !== "string") {
      throw new Error("Campo 'show' inválido.");
    }

    if (typeof obj.fecha !== "string") {
      throw new Error("Campo 'fecha' inválido.");
    }

    if (!Array.isArray(obj.items)) {
      throw new Error("Campo 'items' inválido.");
    }

    const items: SetListItem[] = obj.items.map((item, index) => {
      if (typeof item !== "object" || item === null) {
        throw new Error(`Item ${index + 1} inválido.`);
      }

      const current = item as Record<string, unknown>;

      if (typeof current.tipo !== "string") {
        throw new Error(`Item ${index + 1}: 'tipo' inválido.`);
      }

      if (typeof current.color !== "string") {
        throw new Error(`Item ${index + 1}: 'color' inválido.`);
      }

      if (typeof current.nombre !== "string") {
        throw new Error(`Item ${index + 1}: 'nombre' inválido.`);
      }

      return {
        tipo: current.tipo,
        color: current.color,
        nombre: current.nombre,
        tono: typeof current.tono === "string" ? current.tono : undefined,
        tempo: typeof current.tempo === "number" ? current.tempo : undefined,
        nota: typeof current.nota === "string" ? current.nota : undefined,
      };
    });

    return {
      version: obj.version,
      banda: obj.banda,
      show: obj.show,
      fecha: obj.fecha,
      items,
    };
  }
}