import { Search } from "lucide-react";

type ExpenseToolbarProps = {
    searchTerm: string;
    setSearchTerm: (value: string) => void;

    selectedCategory: string;
    setSelectedCategory: (value: string) => void;

    sortBy: string;
    setSortBy: (value: string) => void;
};

export default function ExpenseToolbar({
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
}: ExpenseToolbarProps) {
    return (
        <div className="mb-6">
            <div className="space-y-3">
                {/* Search */}
                <div className="relative flex-1">
                    <Search
                        size={18}
                        className="
                            absolute
                            left-3
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                        "
                    />

                    <input
                        type="text"
                        placeholder="Search expenses..."
                        value={searchTerm}
                        onChange={(e) =>
                            setSearchTerm(
                                e.target.value
                            )
                        }
                        className="
                            w-full
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            py-2.5
                            pl-10
                            pr-4
                            text-sm
                            text-slate-900
                            outline-none
                            transition-all
                            focus:border-transparent
                            focus:ring-2
                            focus:ring-slate-300
                            dark:border-slate-700
                            dark:bg-slate-900
                            dark:text-slate-100
                            dark:focus:ring-slate-600
                        "
                    />
                </div>

                {/* Category Filter */}
                <div
                    className="
                        grid
                        grid-cols-2
                        gap-3
                        lg:flex
                    "
                >
                    <select
                        value={selectedCategory}
                        onChange={(e) =>
                            setSelectedCategory(
                                e.target.value
                            )
                        }
                        className="
                            w-full
                            lg:w-44
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            px-4
                            py-2.5
                            text-sm
                            text-slate-900
                            outline-none
                            transition-all
                            focus:border-transparent
                            focus:ring-2
                            focus:ring-slate-300
                            dark:border-slate-700
                            dark:bg-slate-900
                            dark:text-slate-100
                            dark:focus:ring-slate-600
                        "
                    >
                        <option value="all">
                            All Categories
                        </option>
                        <option value="Food">
                            Food
                        </option>
                        <option value="Shopping">
                            Shopping
                        </option>
                        <option value="Travel">
                            Travel
                        </option>
                        <option value="Bills">
                            Bills
                        </option>
                        <option value="Health">
                            Health
                        </option>
                        <option value="Entertainment">
                            Entertainment
                        </option>
                        <option value="Education">
                            Education
                        </option>
                        <option value="Other">
                            Other
                        </option>
                    </select>

                    {/* Sort */}
                    <select
                        value={sortBy}
                        onChange={(e) =>
                            setSortBy(
                                e.target.value
                            )
                        }
                        className="
                            w-full
                            lg:w-44
                            rounded-xl
                            border
                            border-slate-200
                            bg-white
                            px-4
                            py-2.5
                            text-sm
                            text-slate-900
                            outline-none
                            transition-all
                            focus:border-transparent
                            focus:ring-2
                            focus:ring-slate-300
                            dark:border-slate-700
                            dark:bg-slate-900
                            dark:text-slate-100
                            dark:focus:ring-slate-600
                        "
                    >
                        <option value="newest">
                            Newest First
                        </option>

                        <option value="oldest">
                            Oldest First
                        </option>

                        <option value="highest">
                            Highest Amount
                        </option>

                        <option value="lowest">
                            Lowest Amount
                        </option>
                    </select>
                </div>
            </div>
        </div>
    );
}