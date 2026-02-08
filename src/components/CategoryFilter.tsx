import { categories } from '../data/projects';

interface CategoryFilterProps {
    selected: string;
    onSelect: (category: string) => void;
}

export default function CategoryFilter({
    selected,
    onSelect,
}: CategoryFilterProps) {
    return (
        <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onSelect(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${selected === category
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-black'
                        }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}
