import { schema, normalize, denormalize } from 'normalizr';
import joi from '@hapi/joi';
import {
  User,
  userJoiSchema,
  userSamples,
  userNormalizrSchema,
  NormalizedUsers,
  userNormalizrSchemaKey,
} from '~/state/ducks/user/models';

/**
 * The type of Kiyoshi.
 */
export type Kiyoshi = {
  /** ID */
  id: string;

  /** The timestamp in ISO 8601 format. */
  saidAt: string;

  /** A user who got this Kiyoshi */
  madeBy: User;
};

/**
 * The type of normalized Kiyoshi.
 */
export type NormalizedKiyoshi = Omit<Kiyoshi, 'madeBy'> & {
  /** An ID of a user who got this Kiyoshi */
  madeBy: User['id'];
};

/**
 * The Joi schema of Kiyoshi.
 */
export const kiyoshiJoiSchema = joi.object({
  id: joi.string().uuid().required(),
  saidAt: joi.string().isoDate().required(),
  madeBy: joi
    .alternatives()
    .try(userJoiSchema, userJoiSchema.$_reach(['id']))
    .required(),
});

/**
 * Validates a Kiyoshi object.
 *
 * @param obj - an object to validate.
 * @returns the validated given object.
 * @throws {ValidationError} if the given object is not a valid Kiyoshi object.
 */
export const validateKiyoshi = (obj: any) => {
  joi.assert(obj, kiyoshiJoiSchema.required());
  return obj as Kiyoshi;
};

/**
 * Validates a Kiyoshi list.
 *
 * @param obj - an object to validate.
 * @returns the validated given object.
 * @throws {ValidationError} if the given object is not a valid Kiyoshi list.
 */
export const validateKiyoshiList = (obj: any) => {
  joi.assert(obj, joi.array().items(kiyoshiJoiSchema).required());
  return obj as Kiyoshi[];
};

export const kiyoshiSamples = Object.freeze([
  Object.freeze({
    id: '015dd491-1b2f-4009-96d3-ae96c05b5f88',
    saidAt: '2019-10-28T06:21:21.355+0900',
    madeBy: userSamples[0],
  }),
  Object.freeze({
    id: 'f626d702-fbdd-46c1-a50c-728b1d630e34',
    saidAt: '2020-02-08T02:51:20.222Z',
    madeBy: userSamples[1],
  }),
  Object.freeze({
    id: '43f52641-b28b-4d38-8e28-ee620e979e72',
    saidAt: '2020-02-20T12:11:00.123Z',
    madeBy: userSamples[2],
  }),
  Object.freeze({
    id: '2b6a91e4-5ac5-4e9a-a679-03d9efa77e18',
    saidAt: '2020-03-12T22:41:05.444Z',
    madeBy: userSamples[3],
  }),
] as Kiyoshi[]);

/**
 * The key of normalizr schema of Kiyoshi.
 */
export const kiyoshiNormalizrSchemaKey = 'kiyoshies';

/**
 * The normalizr schema of Kiyoshi.
 */
export const kiyoshiNormalizrSchema = new schema.Entity<Kiyoshi>(
  kiyoshiNormalizrSchemaKey,
  { madeBy: userNormalizrSchema },
  {
    idAttribute: 'id',
  },
);

/**
 * The type of normalized Kiyoshies.
 */
export type NormalizedKiyoshies = {
  [id: string]: NormalizedKiyoshi;
};

/**
 * Normalize Kiyoshies.
 *
 * @param kiyoshies - a list of {@link Kiyoshi} objects.
 * @returns normalized Kiyoshies.
 */
export const normalizeKiyoshies = (kiyoshies: Kiyoshi[]) =>
  normalize<
    Kiyoshi,
    {
      [kiyoshiNormalizrSchemaKey]: NormalizedKiyoshies;
      [userNormalizrSchemaKey]: NormalizedUsers;
    },
    Kiyoshi['id'][]
  >(kiyoshies, [kiyoshiNormalizrSchema]);

/**
 * Denormalized Kiyoshies.
 *
 * @param kiyoshies - normalized Kiyoshies.
 * @returns denormalized Kiyoshies (i.e. a list of {@link Kiyoshi} objects).
 */
export const denormalizeKiyoshies = (kiyoshies: ReturnType<typeof normalizeKiyoshies>): Kiyoshi[] =>
  denormalize(kiyoshies.result, [kiyoshiNormalizrSchema], kiyoshies.entities);
