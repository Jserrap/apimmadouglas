import { OpenAPIV3 } from "openapi-types";

const swaggerSpec: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "MMA API",
    version: "1.0.0",
    description: "API para gerenciamento de lutadores, lutas e cards de MMA"
  },
  servers: [
    { url: "http://localhost:3000/api" }
  ],
  paths: {
    "/lutadores": {
      get: {
        summary: "Lista todos os lutadores",
        tags: ["Lutador"],
        responses: {
          "200": {
            description: "Lista de lutadores",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Lutador" }
                }
              }
            }
          }
        }
      },
      post: {
        summary: "Cria um novo lutador",
        tags: ["Lutador"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LutadorInput" }
            }
          }
        },
        responses: {
          "201": {
            description: "Lutador criado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Lutador" }
              }
            }
          }
        }
      }
    },
    "/lutadores/{id}": {
      get: {
        summary: "Obtém um lutador pelo ID",
        tags: ["Lutador"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        responses: {
          "200": {
            description: "Lutador encontrado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/LutadorDetail" }
              }
            }
          },
          "404": { description: "Lutador não encontrado" }
        }
      },
      put: {
        summary: "Atualiza um lutador",
        tags: ["Lutador"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LutadorInput" }
            }
          }
        },
        responses: {
          "200": {
            description: "Lutador atualizado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Lutador" }
              }
            }
          },
          "404": { description: "Lutador não encontrado" }
        }
      },
      delete: {
        summary: "Remove um lutador",
        tags: ["Lutador"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        responses: {
          "204": { description: "Lutador removido" },
          "404": { description: "Lutador não encontrado" }
        }
      }
    },
    "/cards": {
      get: {
        summary: "Lista todos os cards",
        tags: ["Card"],
        responses: {
          "200": {
            description: "Lista de cards",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Card" }
                }
              }
            }
          }
        }
      },
      post: {
        summary: "Cria um novo card",
        tags: ["Card"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CardInput" }
            }
          }
        },
        responses: {
          "201": {
            description: "Card criado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Card" }
              }
            }
          }
        }
      }
    },
    "/cards/{id}": {
      get: {
        summary: "Obtém um card pelo ID (com lutas)",
        tags: ["Card"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        responses: {
          "200": {
            description: "Card encontrado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CardDetail" }
              }
            }
          },
          "404": { description: "Card não encontrado" }
        }
      },
      put: {
        summary: "Atualiza um card",
        tags: ["Card"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CardInput" }
            }
          }
        },
        responses: {
          "200": {
            description: "Card atualizado",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Card" }
              }
            }
          },
          "404": { description: "Card não encontrado" }
        }
      },
      delete: {
        summary: "Remove um card",
        tags: ["Card"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        responses: {
          "204": { description: "Card removido" },
          "404": { description: "Card não encontrado" }
        }
      }
    },
    "/lutas": {
      get: {
        summary: "Lista todas as lutas (inclui lutadores e card)",
        tags: ["Luta"],
        responses: {
          "200": {
            description: "Lista de lutas",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/LutaDetail" }
                }
              }
            }
          }
        }
      },
      post: {
        summary: "Cria uma nova luta",
        tags: ["Luta"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LutaInput" }
            }
          }
        },
        responses: {
          "201": {
            description: "Luta criada",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Luta" }
              }
            }
          }
        }
      }
    },
    "/lutas/{id}": {
      get: {
        summary: "Obtém uma luta pelo ID (inclui lutadores e card)",
        tags: ["Luta"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        responses: {
          "200": {
            description: "Luta encontrada",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/LutaDetail" }
              }
            }
          },
          "404": { description: "Luta não encontrada" }
        }
      },
      put: {
        summary: "Atualiza uma luta",
        tags: ["Luta"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LutaInput" }
            }
          }
        },
        responses: {
          "200": {
            description: "Luta atualizada",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Luta" }
              }
            }
          },
          "404": { description: "Luta não encontrada" }
        }
      },
      delete: {
        summary: "Remove uma luta",
        tags: ["Luta"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        responses: {
          "204": { description: "Luta removida" },
          "404": { description: "Luta não encontrada" }
        }
      }
    }
  },
  components: {
    schemas: {
      Lutador: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          nome: { type: "string", example: "José Aldo" },
          pais: { type: "string", example: "Brasil" },
          categoria: { type: "string", example: "Peso Pena" }
        }
      },
      LutadorInput: {
        type: "object",
        required: ["nome", "pais", "categoria"],
        properties: {
          nome: { type: "string", example: "José Aldo" },
          pais: { type: "string", example: "Brasil" },
          categoria: { type: "string", example: "Peso Pena" }
        }
      },
      LutadorDetail: {
        allOf: [
          { $ref: "#/components/schemas/Lutador" },
          {
            type: "object",
            properties: {
              lutasA: {
                type: "array",
                items: { $ref: "#/components/schemas/Luta" }
              },
              lutasB: {
                type: "array",
                items: { $ref: "#/components/schemas/Luta" }
              }
            }
          }
        ]
      },
      Card: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          nome: { type: "string", example: "UFC 300" },
          data: { type: "string", format: "date-time", example: "2024-10-03T19:00:00Z" }
        }
      },
      CardInput: {
        type: "object",
        required: ["nome", "data"],
        properties: {
          nome: { type: "string", example: "UFC 300" },
          data: { type: "string", format: "date-time", example: "2024-10-03T19:00:00Z" }
        }
      },
      CardDetail: {
        allOf: [
          { $ref: "#/components/schemas/Card" },
          {
            type: "object",
            properties: {
              lutas: {
                type: "array",
                items: { $ref: "#/components/schemas/LutaDetail" }
              }
            }
          }
        ]
      },
      Luta: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          lutadorAId: { type: "integer", example: 1 },
          lutadorBId: { type: "integer", example: 2 },
          cardId: { type: "integer", example: 1 },
          resultado: { type: "string", example: "nocaute" }
        }
      },
      LutaInput: {
        type: "object",
        required: ["lutadorAId", "lutadorBId", "cardId"],
        properties: {
          lutadorAId: { type: "integer", example: 1 },
          lutadorBId: { type: "integer", example: 2 },
          cardId: { type: "integer", example: 1 },
          resultado: { type: "string", example: "nocaute" }
        }
      },
      LutaDetail: {
        allOf: [
          { $ref: "#/components/schemas/Luta" },
          {
            type: "object",
            properties: {
              lutadorA: { $ref: "#/components/schemas/Lutador" },
              lutadorB: { $ref: "#/components/schemas/Lutador" },
              card: { $ref: "#/components/schemas/Card" }
            }
          }
        ]
      }
    }
  },
  tags: [
    { name: "Lutador" },
    { name: "Card" },
    { name: "Luta" }
  ]
};

export default swaggerSpec;