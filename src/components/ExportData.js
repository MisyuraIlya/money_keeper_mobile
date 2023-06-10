import React, { useState } from 'react';
import { Button} from 'antd';
const ExportData = () => {
    const [copy, setCopy] = useState(false)
    return (
        <div>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => setCopy(!copy)}
            >
              Export
            </Button>
            {
                copy&&
                <div>
                    {JSON.stringify(localStorage.dbData)}
                </div>
            }

        </div>
    );
};

export default ExportData;