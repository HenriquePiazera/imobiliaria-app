import { ClientRepository } from "@/repositories/clients/client.repository";
import { ContractRepository } from "@/repositories/contracts/contract.repository";
import { PropertyRepository } from "@/repositories/properties/property.repository";
import { SettingsRepository } from "@/repositories/settings/settings.repository";

const PROPERTY_IMAGES = {
  apartment:
    "https://images.unsplash.com/photo-1502672260266-1c1ef2cd9368?w=800&q=80",
  house:
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
  penthouse:
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  studio:
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
  townhouse:
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  loft:
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
} as const;

export class SeedDemoService {
  constructor(private readonly ownerId: string) {}

  async seed() {
    const clientRepo = new ClientRepository(this.ownerId);
    const propertyRepo = new PropertyRepository(this.ownerId);
    const contractRepo = new ContractRepository(this.ownerId);
    const settingsRepo = new SettingsRepository(this.ownerId);

    const now = new Date().toISOString();

    const createdClients = await Promise.all([
      clientRepo.createClient({
          ownerId: this.ownerId,
          name: "Maria Silva",
          email: "maria.silva@email.com",
          phone: "(11) 98765-4321",
          document: "123.456.789-00",
          city: "São Paulo",
          state: "SP",
          address: "Rua Oscar Freire, 1200",
          status: "lead",
          notes: "Interessada em apartamentos nos Jardins.",
          createdAt: now,
        }),
        clientRepo.createClient({
          ownerId: this.ownerId,
          name: "João Santos",
          email: "joao.santos@email.com",
          phone: "(11) 97654-3210",
          document: "987.654.321-00",
          city: "São Paulo",
          state: "SP",
          address: "Av. Paulista, 1500",
          status: "client",
          notes: "Cliente recorrente — 2 contratos anteriores.",
          createdAt: now,
        }),
        clientRepo.createClient({
          ownerId: this.ownerId,
          name: "Ana Costa",
          email: "ana.costa@email.com",
          phone: "(11) 96543-2109",
          document: "456.789.123-00",
          city: "São Paulo",
          state: "SP",
          address: "Rua Haddock Lobo, 800",
          status: "client",
          notes: "Busca imóvel para investimento.",
          createdAt: now,
        }),
        clientRepo.createClient({
          ownerId: this.ownerId,
          name: "Carlos Oliveira",
          email: "carlos.oliveira@email.com",
          phone: "(11) 95432-1098",
          document: "321.654.987-00",
          city: "Campinas",
          state: "SP",
          address: "Rua Barão de Jaguara, 300",
          status: "inactive",
          notes: "Sem retorno desde março/2026.",
          createdAt: now,
        }),
      ]);

    const createdProperties = await Promise.all([
        propertyRepo.createProperty({
          ownerId: this.ownerId,
          title: "Apartamento 3 quartos — Jardins",
          type: "Apartamento",
          purpose: "Aluguel",
          price: 8500,
          city: "São Paulo",
          district: "Jardins",
          status: "Disponível",
          description:
            "Apartamento amplo com 3 suítes, varanda gourmet e 2 vagas. Condomínio com piscina e academia.",
          imageUrl: PROPERTY_IMAGES.apartment,
          createdAt: now,
        }),
        propertyRepo.createProperty({
          ownerId: this.ownerId,
          title: "Casa térrea — Alphaville",
          type: "Casa",
          purpose: "Venda",
          price: 1850000,
          city: "Barueri",
          district: "Alphaville",
          status: "Disponível",
          description:
            "Casa com 4 quartos, piscina aquecida, churrasqueira e jardim. Condomínio fechado com segurança 24h.",
          imageUrl: PROPERTY_IMAGES.house,
          createdAt: now,
        }),
        propertyRepo.createProperty({
          ownerId: this.ownerId,
          title: "Cobertura duplex — Moema",
          type: "Cobertura",
          purpose: "Aluguel",
          price: 12000,
          city: "São Paulo",
          district: "Moema",
          status: "Disponível",
          description:
            "Cobertura com vista panorâmica, 4 suítes, home office e terraço com jacuzzi.",
          imageUrl: PROPERTY_IMAGES.penthouse,
          createdAt: now,
        }),
        propertyRepo.createProperty({
          ownerId: this.ownerId,
          title: "Studio mobiliado — Pinheiros",
          type: "Studio",
          purpose: "Aluguel",
          price: 2800,
          city: "São Paulo",
          district: "Pinheiros",
          status: "Disponível",
          description:
            "Studio compacto e moderno, ideal para profissionais. Próximo ao metrô e comercio local.",
          imageUrl: PROPERTY_IMAGES.studio,
          createdAt: now,
        }),
        propertyRepo.createProperty({
          ownerId: this.ownerId,
          title: "Sobrado — Morumbi",
          type: "Sobrado",
          purpose: "Venda",
          price: 1200000,
          city: "São Paulo",
          district: "Morumbi",
          status: "Disponível",
          description:
            "Sobrado com 3 pavimentos, 5 quartos, elevador privativo e área gourmet completa.",
          imageUrl: PROPERTY_IMAGES.townhouse,
          createdAt: now,
        }),
        propertyRepo.createProperty({
          ownerId: this.ownerId,
          title: "Loft industrial — Vila Madalena",
          type: "Loft",
          purpose: "Venda",
          price: 920000,
          city: "São Paulo",
          district: "Vila Madalena",
          status: "Disponível",
          description:
            "Loft com pé-direito duplo, acabamento industrial e localização premium.",
          imageUrl: PROPERTY_IMAGES.loft,
          createdAt: now,
        }),
      ]);

    const [clientMaria, clientJoao, clientAna] = createdClients;
    const [
      propJardins,
      propAlphaville,
      propMoema,
      propPinheiros,
      propMorumbi,
    ] = createdProperties;

    await Promise.all([
      contractRepo.createContract({
        ownerId: this.ownerId,
        clientId: clientJoao.id,
        propertyId: propJardins.id,
        clientName: "João Santos",
        propertyTitle: "Apartamento 3 quartos — Jardins",
        type: "rent",
        value: 8500,
        status: "active",
        startDate: "2026-01-15",
        endDate: "2027-01-15",
      }),
      contractRepo.createContract({
        ownerId: this.ownerId,
        clientId: clientAna.id,
        propertyId: propPinheiros.id,
        clientName: "Ana Costa",
        propertyTitle: "Studio mobiliado — Pinheiros",
        type: "rent",
        value: 2800,
        status: "active",
        startDate: "2026-02-01",
        endDate: "2027-02-01",
      }),
      contractRepo.createContract({
        ownerId: this.ownerId,
        clientId: clientAna.id,
        propertyId: propAlphaville.id,
        clientName: "Ana Costa",
        propertyTitle: "Casa térrea — Alphaville",
        type: "sale",
        value: 1850000,
        status: "active",
        startDate: "2026-03-10",
      }),
      contractRepo.createContract({
        ownerId: this.ownerId,
        clientId: clientMaria.id,
        propertyId: propMoema.id,
        clientName: "Maria Silva",
        propertyTitle: "Cobertura duplex — Moema",
        type: "rent",
        value: 12000,
        status: "finished",
        startDate: "2025-06-01",
        endDate: "2026-05-31",
      }),
      contractRepo.createContract({
        ownerId: this.ownerId,
        clientId: clientJoao.id,
        propertyId: propMorumbi.id,
        clientName: "João Santos",
        propertyTitle: "Sobrado — Morumbi",
        type: "sale",
        value: 1200000,
        status: "active",
        startDate: "2026-04-01",
      }),
    ]);

    await settingsRepo.saveSettings({
      companyName: "Horizon Imóveis",
      email: "contato@horizonimoveis.com.br",
      phone: "(11) 3456-7890",
      address: "Av. Brigadeiro Faria Lima, 2500 — São Paulo, SP",
      primaryColor: "#18181b",
    });
  }
}
