declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]];

	// TODO: Remove this when having this fallback is no longer relevant. 2.3? 3.0? - erika, 2023-04-04
	/**
	 * @deprecated
	 * `astro:content` no longer provide `image()`.
	 *
	 * Please use it through `schema`, like such:
	 * ```ts
	 * import { defineCollection, z } from "astro:content";
	 *
	 * defineCollection({
	 *   schema: ({ image }) =>
	 *     z.object({
	 *       image: image(),
	 *     }),
	 * });
	 * ```
	 */
	export const image: never;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S | ((context: SchemaContext) => S);
	};
	export function defineCollection<S extends BaseSchema>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	type EntryMapKeys = keyof typeof entryMap;
	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidEntrySlug<C extends EntryMapKeys> = AllValuesOf<(typeof entryMap)[C]>['slug'];

	export function getEntryBySlug<
		C extends keyof typeof entryMap,
		E extends ValidEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getCollection<C extends keyof typeof entryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof typeof entryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	const entryMap: {
		"author": {
"Positivity.md": {
  id: "Positivity.md",
  slug: "positivity",
  body: string,
  collection: "author",
  data: InferEntrySchema<"author">
} & { render(): Render[".md"] },
"christie.md": {
  id: "christie.md",
  slug: "christie",
  body: string,
  collection: "author",
  data: InferEntrySchema<"author">
} & { render(): Render[".md"] },
"lesley.md": {
  id: "lesley.md",
  slug: "lesley",
  body: string,
  collection: "author",
  data: InferEntrySchema<"author">
} & { render(): Render[".md"] },
},
"category": {
"article.md": {
  id: "article.md",
  slug: "article",
  body: string,
  collection: "category",
  data: InferEntrySchema<"category">
} & { render(): Render[".md"] },
"photo-of-the-day.md": {
  id: "photo-of-the-day.md",
  slug: "photo-of-the-day",
  body: string,
  collection: "category",
  data: InferEntrySchema<"category">
} & { render(): Render[".md"] },
"review.md": {
  id: "review.md",
  slug: "review",
  body: string,
  collection: "category",
  data: InferEntrySchema<"category">
} & { render(): Render[".md"] },
"series.md": {
  id: "series.md",
  slug: "series",
  body: string,
  collection: "category",
  data: InferEntrySchema<"category">
} & { render(): Render[".md"] },
},
"post": {
"allan-bridge.md": {
  id: "allan-bridge.md",
  slug: "allan-bridge",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] },
"black-faced-cuckoo-shrike.md": {
  id: "black-faced-cuckoo-shrike.md",
  slug: "black-faced-cuckoo-shrike",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] },
"focus-photography-awards-dinner-2019.md": {
  id: "focus-photography-awards-dinner-2019.md",
  slug: "focus-photography-awards-dinner-2019",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] },
"new-site.md": {
  id: "new-site.md",
  slug: "new-site",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] },
"real-life-review-sony-alpha-1-camera.md": {
  id: "real-life-review-sony-alpha-1-camera.md",
  slug: "real-life-review-sony-alpha-1-camera",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] },
"review-nokton-75mm-vm.md": {
  id: "review-nokton-75mm-vm.md",
  slug: "review-nokton-75mm-vm",
  body: string,
  collection: "post",
  data: InferEntrySchema<"post">
} & { render(): Render[".md"] },
},

	};

	type ContentConfig = typeof import("../src/content/config");
}
