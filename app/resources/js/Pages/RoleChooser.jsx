import {useForm} from "@inertiajs/react";
import PrimaryButton from '@/Components/PrimaryButton';

const RoleChooser = () => {
    const {data, setData, post, processing} = useForm({
        role: 'Client',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('roleIdentification'));
    };

    return (
        <div className="flex justify-center items-center h-screen" style={{minWidth: "320px"}}>
            <form onSubmit={submit} className="bg-white p-8 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                        Оберіть роль:
                    </label>
                    <select
                        value={data.role}
                        onChange={(e) => setData('role', e.target.value)}
                        className="block w-full bg-gray-100 border border-gray-300 text-gray-700 py-2 px-3 rounded-lg leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
                    >
                        <option value="Client">Client</option>
                        <option value="Company">Company</option>
                    </select>
                </div>
                <PrimaryButton className="mt-4" disabled={processing}>
                    Choose
                </PrimaryButton>
            </form>
        </div>
    )
}

export default RoleChooser
