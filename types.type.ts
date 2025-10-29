export interface ProtfolioServiceType {
  id: 1
  slug: string
  title: string
  description: string
  image: string
  created_at: string
}

export interface ProtfolioType {
  id: number
  slug: string
  title: string
  service: ProtfolioServiceType
  description: string
  image: string
  created_at: string
}

export interface BannerItemType {
  id: number
  title: string
  description: string
  years_of_experience: number
  completed_projects: number
  image: string
  created_at: string
}

export interface ServiceItemType {
  id: number
  slug: string
  title: string
  description: string
  meta_title: string
  meta_description: string 
  icon: string
  image: string
  created_at: string
}

export interface WebsiteDesignHome {
  id: number
  slug: string
  title: string
  image: string 
  description: string
  created_at: string
}

export interface ClientItemType {
  id: number
  slug: string
  title: string
  image: string
  created_at: string
}


export interface HomeResponseType {
  status: "success" | "error"
  text: string
  msg_data: {
    protfolio: ProtfolioType[]

    aboutUs: AboutUsType

    blog: BlogItemType[]
    banners: BannerItemType
    services: ServiceItemType[]
    Website_design_agency_and_web_development: WebsiteDesignHome
    clients: ClientItemType[]
  }
}

export interface ServicesReponseType {
  status: "success" | "error"
  text: string
  msg_data: ServiceItemType[]
}

export interface SeoType {
  status: "success" | "error"
  text: string
  msg_data: Record<string, string>[]
}

export interface SeoItemType {
  status: "success" | "error"
  text: string
  msg_data: Record<string, string>
}

export interface ContactUsRequest {
  name: string
  email: string
  phone: string
  notes: string
}

export type PaginationType = {
  total: number
  last_page: number
  current_page: number
  per_page: number
}

export interface PortofilioResponse {
  status: "success" | "error"
  text: string
  msg_data: {
    data: ProtfolioType[]
    filters: Record<string, string>
  }
  pagination: PaginationType
}

export interface BlogItemType {
  id: number
  slug: {
    "ar": string 
    "en": string
  }
  title: string
  short_description: string
  description: string
  image: string
  is_popular: number
  faqs: FaqItem[]
  created_at: string
  published_date: string
  meta_title: string
  meta_description: string
}

export interface BlogItemResponse {
  status: "success" | "error"
  text: string
  msg_data: {
    blog: BlogItemType
    popular_blogs: BlogItemType[]
  }
}

export interface BlogResponse {
  status: "success" | "error"
  text: string
  msg_data: BlogItemType[]
  pagination: PaginationType
}

export type ContactInfoAddress = {
  en: string
  ar: string
}

export type ContactInfoData = {
  id: number
  title: string | null
  description: string | null
  address: ContactInfoAddress
  phone1: string
  phone2: string
  landline_1: string
  landline_2: string
  email: string
  facebook_link: string
  instagram_link: string
  twitter_link: string
  youtube_link: string
  linkedIn_link: string
  tiktok_link: string
  whatsapp_number: string
  snapchat_link: string
  postal_code: string
  tax_id: string
  map_link: string
  deleted_at: string | null
  created_at: string
  updated_at: string
}

export interface ContactInfoResponse {
  status: "success" | "error"
  text: string
  msg_data: ContactInfoData
}

export interface HostingPlansResponse {
  status: string
  text: string
  msg_data: HostingPlansType[]
}

export interface HostingPlansType {
  id: number
  name: string
  slug: string
  price: string
  description: string 
  currency: string
  billing_cycle: string
  free_domain: boolean
  is_most_popular: boolean
  created_at: string
  updated_at: string
}

export interface ServicesFormKeys {
  "Website Design": string
  "Graphic Design": string
  "Logo Design": string
  "Email Marketing": string
  "E Commerce": string
  "Website Development": string
  SEO: string
  Video: string
  "Facebook Marketing": string
}

export interface ServicesFormResponse {
  status: "success" | "error"
  text: string
  msg_data: ServicesFormKeys
}

export interface JobType {
  id: number
  slug: string
  title: string
  description: string
  image: string
  created_at: string
}

export interface JobsResponse {
  status: "success" | "error"
  text: string
  msg_data: JobType[]
}

export interface FaqItem {
  id: number
  question: string
  answer: string
  created_at: string
}

export interface FaqReponse {
  status: "success" | "error"
  text: string
  msg_data: FaqItem[][]
}

export interface AboutUsType {
  images: string[]
  title: string 
  slug: string 
  id: number 
  created_at: string
  description: string 
}

export interface AboutUsReponse {
  status: "success" | 'error'
  text: string 
  msg_data: AboutUsType[]
}


export interface DynamicSlugResponse {
  status: "success" | "error"
  text: string
  msg_data: {
    type: "service" | "blog"
    blog: BlogItemType
    popular_blogs: BlogItemType[]
    service: ServiceItemType
  }
}


export type NavigationResp = {
  status: "error" | "success"
  text: string
  msg_data: { title: string; slug: string }[]
}