import {useForm} from "@inertiajs/react";
import PrimaryButton from '@/Components/PrimaryButton';

const RoleChooser = () => {
    const { data, setData, post, processing} = useForm({
        role: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('roleIdentification'));
    };

    return (
        <>
            <form onSubmit={submit}>
                <div>
                    <label>
                        Оберіть роль:
                        <select value={data.role} onChange={(e) => setData('role', e.target.value)}>
                            <option value="Client">Client</option>
                            <option value="Company">Company</option>
                        </select>
                    </label>
                </div>
                <PrimaryButton className="ms-4" disabled={processing}>
                    Choose
                </PrimaryButton>
            </form>
        </>
    )
}

export default RoleChooser
