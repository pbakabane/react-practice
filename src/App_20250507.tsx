import { useState } from 'react';
import Checkbox from './Checkbox';
import { Button } from './Button';

const App: React.FC = () => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <><div>
            <Checkbox isChecked={isChecked} onChange={setIsChecked} />
        </div><div>
                <Button disabled={isChecked} />
            </div></>
    );
}

export default App;
