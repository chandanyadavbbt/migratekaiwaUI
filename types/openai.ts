import { OPENAI_API_TYPE } from '../utils/app/const';

export interface OpenAIModel {
  id: string;
  name: string;
  maxLength: number; // maximum length of a message
  tokenLimit: number;
}
//mitul default model changes
export enum OpenAIModelID {
  LLAMA_7B = 'llama-7b',
  GPT_3_5 = 'gpt-3.5-turbo',
  GPT_3_5_AZ = 'gpt-35-turbo',
  GPT_4 = 'gpt-4',
  GPT_4_32K = 'gpt-4-32k',
  LLAMA_13B = 'llama-13b',
  LLAMA_33B = 'llama-33b',
  LLAMA_65B = 'llama-65b',
  JAIS_13B="JAIS-13B"
}

export const LlamaModels = [
  { id: OpenAIModelID.LLAMA_7B, name: "LLAMA-7B" },
  { id: OpenAIModelID.LLAMA_13B, name: "LLAMA-13B" },
  { id: OpenAIModelID.LLAMA_33B, name: "LLAMA-33B" },
  { id: OpenAIModelID.LLAMA_65B, name: "LLAMA-65B" },
  { id: OpenAIModelID.JAIS_13B, name: "JAIS-13B" },
];

const LlamaModelSet = new Set(LlamaModels.map(item => item.id.valueOf()));

export function is_llama(model_name: string) {
  return LlamaModelSet.has(model_name);
}

// in case the `DEFAULT_MODEL` environment variable is not set or set to an unsupported model
export const fallbackModelID = OpenAIModelID.LLAMA_7B;
export const DEFAULT_MODEL = OpenAIModelID.LLAMA_7B;

export const OpenAIModels: Record<OpenAIModelID, OpenAIModel> = {
  [OpenAIModelID.LLAMA_7B]: {
    id: OpenAIModelID.LLAMA_7B,
    name: 'KAIWA Model',
    maxLength: 24000,
    tokenLimit: 8000,
  },
  [OpenAIModelID.JAIS_13B]: {
    id: OpenAIModelID.JAIS_13B,
    name: 'JAIS',
    maxLength: 24000,
    tokenLimit: 8000,
  },
  [OpenAIModelID.GPT_3_5]: {
    id: OpenAIModelID.GPT_3_5,
    name: 'GPT-3.5',
    maxLength: 12000,
    tokenLimit: 4000,
  },
  [OpenAIModelID.GPT_3_5_AZ]: {
    id: OpenAIModelID.GPT_3_5_AZ,
    name: 'GPT-3.5',
    maxLength: 12000,
    tokenLimit: 4000,
  },
  [OpenAIModelID.GPT_4]: {
    id: OpenAIModelID.GPT_4,
    name: 'GPT-4',
    maxLength: 24000,
    tokenLimit: 8000,
  },
  [OpenAIModelID.GPT_4_32K]: {
    id: OpenAIModelID.GPT_4_32K,
    name: 'GPT-4-32K',
    maxLength: 96000,
    tokenLimit: 32000,
  },
  [OpenAIModelID.LLAMA_13B]: {
    id: OpenAIModelID.LLAMA_13B,
    name: 'LLAMA-13B',
    maxLength: 24000,
    tokenLimit: 8000,
  },
  [OpenAIModelID.LLAMA_33B]: {
    id: OpenAIModelID.LLAMA_33B,
    name: 'LLAMA-33B',
    maxLength: 24000,
    tokenLimit: 8000,
  },
  [OpenAIModelID.LLAMA_65B]: {
    id: OpenAIModelID.LLAMA_65B,
    name: 'LLAMA-65B',
    maxLength: 24000,
    tokenLimit: 8000,
  },
};
