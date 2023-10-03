import { FC, ChangeEventHandler, useState, useEffect } from 'react';
import classnames from 'classnames';
import slugify from 'slugify';

export interface SeoResult {
  meta: string;
  slug: string;
  tags: string;
}

interface IProps {
  initialValue?: SeoResult;
  title?: string;
  onChange: (result: SeoResult) => void;
}

const commonInput =
  'w-full bg-transparent outline-none border-2 border-secondary-dark focus:border-primary-dark focus:dark:border-primary rounded transition text-primary-dark dark:text-primary p-2';

const Input: FC<{
  name?: string;
  value?: string;
  placeholder?: string;
  label?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}> = ({ name, value, placeholder, label, onChange }) => {
  return (
    <label className="block relative">
      <span className="absolute top-1/2 -translate-y-1/2 text-sm font-semibold text-primary-dark dark:text-primary pl-2">
        {label}
      </span>
      <input
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        className={classnames(commonInput, 'italic pl-11')}
        onChange={onChange}
      />
    </label>
  );
};

const SeoForm: FC<IProps> = ({ initialValue, title = '', onChange }) => {
  const [values, setValues] = useState({ meta: '', slug: '', tags: '' });

  const { meta, slug, tags } = values;

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = ({ target }) => {
    const { name, value } = target;
    const newValues = { ...values, [name]: value };
    setValues(newValues);
    onChange && onChange(newValues);
  };

  useEffect(() => {
    const slug = slugify(title.toLowerCase());
    const newValues = { ...values, slug };
    setValues(newValues);
    onChange && onChange(newValues);
  }, [title]);

  useEffect(() => {
    if (initialValue) {
      setValues({ ...initialValue, slug: slugify(initialValue.slug) });
    }
  }, [initialValue]);

  return (
    <div className="space-y-4">
      <h1 className="text-primary-dark dark:text-primary text-xl font-semibold">
        SEO Section
      </h1>
      <Input
        value={slug}
        name="slug"
        placeholder="slug-goes-here"
        label="Slug:"
        onChange={handleChange}
      />
      <Input
        value={tags}
        name="tags"
        placeholder="React, Next JS"
        label="Tags:"
        onChange={handleChange}
      />
      <div className="relative">
        <textarea
          value={meta}
          name="meta"
          className={classnames(commonInput, 'text-lg h-20 resize-none')}
          placeholder="Meta description 150 characters will be fine"
          maxLength={150}
          onChange={handleChange}
        ></textarea>
        <p className="absolute bottom-3 right-3 text-primary-dark dark:text-primary text-sm">
          {meta?.length || 0}/150
        </p>
      </div>
    </div>
  );
};

export default SeoForm;
