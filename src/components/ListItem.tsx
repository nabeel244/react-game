import { cn } from "@/lib/utils";
import './listItemStyle.css'
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: JSX.Element;
  image?: string;
  title: string | JSX.Element;
  subtitle?: string | JSX.Element;
  action?: string | JSX.Element | false;
};

export default function ListItem({
  image,
  title,
  subtitle,
  className,
  action,
  ...props
}: Props) {
  return (
    <button
      className={cn(
        "group flex items-center w-full gap-4 px-4 py-2 bg-white/10 rounded-xl",

        className
      )}
      type="button"
      {...props}
    >
      {image && (
        <img
          src={image}
          alt={title}
          className="object-contain w-9 h-9 mix-blend-screen slide-up"
        />
      )}
      <div className="text-sm font-medium text-left">
        <p className="slide-up">{title}</p>
       <p className="slide-up"> {subtitle} </p>
      </div>
      <div className="ml-auto">{action}</div>
    </button>
  );
}
