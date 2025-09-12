import { useEffect, useState } from "react";
import JobZImage from "../../../common/jobz-img";
import { loadScript } from "../../../../globals/constants";

function EmpCompanyProfilePage() {
    const [formData, setFormData] = useState({
        // Basic Information
        employerCategory: '',
        companyName: '',
        phone: '',
        email: '',
        website: '',
        establishedSince: '',
        teamSize: '',
        description: '',
        
        // Company Details
        legalEntityCode: '',
        corporateAddress: '',
        branchLocations: '',
        officialEmail: '',
        officialMobile: '',
        companyType: '',
        cin: '',
        gstNumber: '',
        industrySector: '',
        panNumber: '',
        agreeTerms: '',
        
        // Primary Contact
        contactFullName: '',
        contactDesignation: '',
        contactOfficialEmail: '',
        contactMobile: '',
        companyIdCardPicture: '',
        alternateContact: '',
        
        // Images
        logo: '',
        coverImage: ''
    });

    const [loading, setLoading] = useState(false);
    const [editingTeamSize, setEditingTeamSize] = useState(false);

    useEffect(() => {
        loadScript("js/custom.js");
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('employerToken');
            const response = await fetch('http://localhost:5000/api/employer/profile', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (data.success && data.profile) {
                setFormData(prev => ({ ...prev, ...data.profile }));
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('logo', file);
            try {
                const token = localStorage.getItem('employerToken');
                const response = await fetch('http://localhost:5000/api/employer/profile/logo', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData
                });
                const data = await response.json();
                if (data.success) {
                    handleInputChange('logo', data.logo);
                }
            } catch (error) {
                console.error('Logo upload failed:', error);
            }
        }
    };

    const handleCoverUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('cover', file);
            try {
                const token = localStorage.getItem('employerToken');
                const response = await fetch('http://localhost:5000/api/employer/profile/cover', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData
                });
                const data = await response.json();
                if (data.success) {
                    handleInputChange('coverImage', data.coverImage);
                }
            } catch (error) {
                console.error('Cover upload failed:', error);
            }
        }
    };

    const handleDocumentUpload = async (e, fieldName) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('document', file);
            formData.append('fieldName', fieldName);
            try {
                const token = localStorage.getItem('employerToken');
                const response = await fetch('http://localhost:5000/api/employer/profile/document', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData
                });
                const data = await response.json();
                if (data.success) {
                    handleInputChange(fieldName, data.filePath);
                }
            } catch (error) {
                console.error('Document upload failed:', error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('employerToken');
            const response = await fetch('http://localhost:5000/api/employer/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Profile updated successfully!');
            } else {
                const error = await response.json();
                alert(error.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="wt-admin-right-page-header clearfix">
                <h2>Company Details</h2>
            </div>

            {/*Logo and Cover image*/}
            <div className="panel panel-default">
                <div className="panel-heading wt-panel-heading p-a20">
                    <h4 className="panel-tittle m-a0">Logo and Cover image</h4>
                </div>
                
                <div className="panel-body wt-panel-body p-a20 p-b0 m-b30">
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <div className="form-group">
                                <label>Company Logo</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    accept=".jpg,.jpeg,.png"
                                    onChange={handleLogoUpload}
                                />
                                {formData.logo && (
                                    <div className="mt-2">
                                        <img 
                                            src={formData.logo} 
                                            alt="Logo" 
                                            style={{maxWidth: '150px', maxHeight: '150px', objectFit: 'contain', border: '1px solid #ddd'}} 
                                            onError={(e) => {
                                                console.log('Logo load error'); 
                                                e.target.src = '/images/default-logo.png';
                                            }}
                                        />
                                        <p className="text-muted text-success">✓ Logo uploaded successfully</p>
                                    </div>
                                )}
                                <p className="text-muted mt-2">
                                    <b>Company Logo:</b> Max file size is 1MB, Minimum dimension: 136 x 136 And Suitable files are .jpg & .png
                                </p>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-12">
                            <div className="form-group">
                                <label>Background Banner Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    accept=".jpg,.jpeg,.png"
                                    onChange={handleCoverUpload}
                                />
                                {formData.coverImage && (
                                    <div className="mt-2">
                                        <img 
                                            src={formData.coverImage} 
                                            alt="Cover" 
                                            style={{maxWidth: '300px', maxHeight: '150px', objectFit: 'cover', border: '1px solid #ddd'}} 
                                            onError={(e) => {
                                                console.log('Cover load error'); 
                                                e.target.src = '/images/default-cover.png';
                                            }}
                                        />
                                        <p className="text-muted text-success">✓ Cover image uploaded successfully</p>
                                    </div>
                                )}
                                <p className="text-muted mt-2">
                                    <b>Background Banner Image:</b> Max file size is 1MB, Minimum dimension: 770 x 310 And Suitable files are .jpg & .png
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                {/*Basic Information*/}
                <div className="panel panel-default">
                    <div className="panel-heading wt-panel-heading p-a20">
                        <h4 className="panel-tittle m-a0">Basic Informations</h4>
                    </div>

                    <div className="panel-body wt-panel-body p-a20 m-b30">
                        <div className="row">
                            <div className="col-xl-4 col-lg-12 col-md-12">
                                <div className="form-group">
                                    <label>Employer Category</label>
                                    <div className="form-control" style={{backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', color: '#495057'}}>
                                        {formData.employerCategory ? 
                                            (formData.employerCategory === 'company' ? 'Company' : 'Consultancy') 
                                            : 'Not specified'
                                        }
                                    </div>
                                    <small className="text-muted">This field cannot be edited after registration</small>
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-12 col-md-12">
                                <div className="form-group">
                                    <label>Company Name</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={formData.companyName}
                                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                                        placeholder="Enter company name"
                                    />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-12 col-md-12">
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={formData.phone}
                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                        placeholder="(+91) 9087654321"
                                    />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-12 col-md-12">
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input
                                        className="form-control"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        placeholder="company@example.com"
                                    />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-12 col-md-12">
                                <div className="form-group">
                                    <label>Website</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={formData.website}
                                        onChange={(e) => handleInputChange('website', e.target.value)}
                                        placeholder="https://..."
                                    />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-12 col-md-12">
                                <div className="form-group">
                                    <label>Est. Since</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={formData.establishedSince}
                                        onChange={(e) => handleInputChange('establishedSince', e.target.value)}
                                        placeholder="Since..."
                                    />
                                </div>
                            </div>

                            <div className="col-xl-4 col-lg-12 col-md-12">
                                <div className="form-group">
                                    <label>Team Size 
                                        <button 
                                            type="button" 
                                            className="btn btn-sm btn-outline-primary ml-2"
                                            onClick={() => setEditingTeamSize(!editingTeamSize)}
                                            style={{fontSize: '12px', padding: '2px 8px'}}
                                        >
                                            {editingTeamSize ? 'Cancel' : 'Edit'}
                                        </button>
                                    </label>
                                    {editingTeamSize ? (
                                        <div>
                                            <select
                                                className="form-control"
                                                value={formData.teamSize}
                                                onChange={(e) => handleInputChange('teamSize', e.target.value)}
                                            >
                                                <option value="">Select team size</option>
                                                <option value="1-5">1-5</option>
                                                <option value="5-10">5-10</option>
                                                <option value="10-20">10-20</option>
                                                <option value="20-50">20-50</option>
                                                <option value="50-100">50-100</option>
                                                <option value="100+">100+</option>
                                            </select>
                                            <button 
                                                type="button" 
                                                className="btn btn-sm btn-success mt-2"
                                                onClick={() => setEditingTeamSize(false)}
                                                style={{fontSize: '12px', padding: '4px 12px'}}
                                            >
                                                Save
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="form-control" style={{backgroundColor: '#f8f9fa', border: '1px solid #dee2e6'}}>
                                            {formData.teamSize || 'Not specified'}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        className="form-control"
                                        rows={3}
                                        value={formData.description}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        placeholder="Company description..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Company Details */}
                <div className="panel panel-default">
                    <div className="panel-heading wt-panel-heading p-a20">
                        <h4 className="panel-tittle m-a0">Company Details</h4>
                    </div>

                    <div className="panel-body wt-panel-body p-a20 m-b30">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Legal Entity Code (if any)</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={formData.legalEntityCode}
                                        onChange={(e) => handleInputChange('legalEntityCode', e.target.value)}
                                        placeholder="Enter legal entity code"
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Corporate Office Address</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={formData.corporateAddress}
                                        onChange={(e) => handleInputChange('corporateAddress', e.target.value)}
                                        placeholder="Enter corporate address"
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Branch Office Locations (if any)</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={formData.branchLocations}
                                        onChange={(e) => handleInputChange('branchLocations', e.target.value)}
                                        placeholder="Enter branch locations"
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Official Email ID</label>
                                    <input
                                        className="form-control"
                                        type="email"
                                        value={formData.officialEmail}
                                        onChange={(e) => handleInputChange('officialEmail', e.target.value)}
                                        placeholder="email@company.com"
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Official Mobile Number</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={formData.officialMobile}
                                        onChange={(e) => handleInputChange('officialMobile', e.target.value)}
                                        placeholder="Enter mobile number"
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Type of Company / Business</label>
                                    <select 
                                        className="form-control"
                                        value={formData.companyType}
                                        onChange={(e) => handleInputChange('companyType', e.target.value)}
                                    >
                                        <option value="">Select Type</option>
                                        <option value="Private Limited">Private Limited</option>
                                        <option value="LLP">LLP</option>
                                        <option value="Proprietorship">Proprietorship</option>
                                        <option value="Government">Government</option>
                                        <option value="NGO">NGO</option>
                                        <option value="Startup">Startup</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Corporate Identification Number (CIN)</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={formData.cin}
                                        onChange={(e) => handleInputChange('cin', e.target.value)}
                                        placeholder="Enter CIN"
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>GST Number</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={formData.gstNumber}
                                        onChange={(e) => handleInputChange('gstNumber', e.target.value)}
                                        placeholder="Enter GST number"
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Industry Sector</label>
                                    <select 
                                        className="form-control"
                                        value={formData.industrySector}
                                        onChange={(e) => handleInputChange('industrySector', e.target.value)}
                                    >
                                        <option value="">Select Industry</option>
                                        <option value="it">IT</option>
                                        <option value="non-it">Non-IT</option>
                                        <option value="education">Education</option>
                                        <option value="finance">Finance</option>
                                        <option value="healthcare">Healthcare</option>
                                        <option value="manufacturing">Manufacturing</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Company PAN Card Number</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={formData.panNumber}
                                        onChange={(e) => handleInputChange('panNumber', e.target.value)}
                                        placeholder="Enter PAN number"
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Upload PAN Card Image</label>
                                    <input
                                        className="form-control"
                                        type="file"
                                        accept=".jpg,.jpeg,.png,.pdf"
                                        onChange={(e) => handleDocumentUpload(e, 'panCardImage')}
                                    />
                                    {formData.panCardImage && (
                                        <p className="text-success mt-1">✓ PAN Card uploaded</p>
                                    )}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Upload CIN Document</label>
                                    <input
                                        className="form-control"
                                        type="file"
                                        accept=".jpg,.jpeg,.png,.pdf"
                                        onChange={(e) => handleDocumentUpload(e, 'cinImage')}
                                    />
                                    {formData.cinImage && (
                                        <p className="text-success mt-1">✓ CIN Document uploaded</p>
                                    )}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Upload GST Certificate</label>
                                    <input
                                        className="form-control"
                                        type="file"
                                        accept=".jpg,.jpeg,.png,.pdf"
                                        onChange={(e) => handleDocumentUpload(e, 'gstImage')}
                                    />
                                    {formData.gstImage && (
                                        <p className="text-success mt-1">✓ GST Certificate uploaded</p>
                                    )}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Certificate of Incorporation (Issued by RoC)</label>
                                    <input
                                        className="form-control"
                                        type="file"
                                        accept=".jpg,.jpeg,.png,.pdf"
                                        onChange={(e) => handleDocumentUpload(e, 'certificateOfIncorporation')}
                                    />
                                    {formData.certificateOfIncorporation && (
                                        <p className="text-success mt-1">✓ Certificate of Incorporation uploaded</p>
                                    )}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Authorization Letter (if registering on behalf of someone else)</label>
                                    <input
                                        className="form-control"
                                        type="file"
                                        accept=".jpg,.jpeg,.png,.pdf"
                                        onChange={(e) => handleDocumentUpload(e, 'authorizationLetter')}
                                    />
                                    {formData.authorizationLetter && (
                                        <p className="text-success mt-1">✓ Authorization Letter uploaded</p>
                                    )}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Agree to Terms & Conditions</label>
                                    <div>
                                        <label className="m-r10">
                                            <input 
                                                type="radio" 
                                                name="terms" 
                                                value="yes"
                                                checked={formData.agreeTerms === 'yes'}
                                                onChange={(e) => handleInputChange('agreeTerms', e.target.value)}
                                            /> Yes
                                        </label>
                                        <label>
                                            <input 
                                                type="radio" 
                                                name="terms" 
                                                value="no"
                                                checked={formData.agreeTerms === 'no'}
                                                onChange={(e) => handleInputChange('agreeTerms', e.target.value)}
                                            /> No
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Primary Contact Person */}
                <div className="panel panel-default">
                    <div className="panel-heading wt-panel-heading p-a20">
                        <h4 className="panel-tittle m-a0">Primary Contact Person</h4>
                    </div>
                    <div className="panel-body wt-panel-body p-a20 m-b30">
                        <div className="row">
                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={formData.contactFullName}
                                        onChange={(e) => handleInputChange('contactFullName', e.target.value)}
                                        placeholder="Enter Full Name"
                                    />
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Designation</label>
                                    <input
                                        className="form-control"
                                        type="text"
                                        value={formData.contactDesignation}
                                        onChange={(e) => handleInputChange('contactDesignation', e.target.value)}
                                        placeholder="e.g., HR Manager, Recruitment Lead, Founder"
                                    />
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Official Email ID</label>
                                    <input
                                        className="form-control"
                                        type="email"
                                        value={formData.contactOfficialEmail}
                                        onChange={(e) => handleInputChange('contactOfficialEmail', e.target.value)}
                                        placeholder="Enter official email"
                                    />
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Mobile Number</label>
                                    <input
                                        className="form-control"
                                        type="tel"
                                        value={formData.contactMobile}
                                        onChange={(e) => handleInputChange('contactMobile', e.target.value)}
                                        placeholder="Enter mobile number"
                                    />
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Company ID Card Picture</label>
                                    <input
                                        className="form-control"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleDocumentUpload(e, 'companyIdCardPicture')}
                                    />
                                    {formData.companyIdCardPicture && (
                                        <div className="mt-2">
                                            <img 
                                                src={formData.companyIdCardPicture.startsWith('data:') ? formData.companyIdCardPicture : `data:image/jpeg;base64,${formData.companyIdCardPicture}`} 
                                                alt="Company ID Card" 
                                                style={{maxWidth: '200px', maxHeight: '120px', objectFit: 'contain', border: '1px solid #ddd'}} 
                                            />
                                            <p className="text-success mt-1">✓ Company ID Card uploaded</p>
                                        </div>
                                    )}
                                    <p className="text-muted mt-1">Upload any company identification document (Max 5MB)</p>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6">
                                <div className="form-group">
                                    <label>Alternate Contact (Optional)</label>
                                    <input
                                        className="form-control"
                                        type="tel"
                                        value={formData.alternateContact}
                                        onChange={(e) => handleInputChange('alternateContact', e.target.value)}
                                        placeholder="Enter alternate contact"
                                    />
                                </div>
                            </div>

                            <div className="col-lg-12 col-md-12">
                                <div className="text-left">
                                    <button type="submit" className="site-button" disabled={loading}>
                                        {loading ? 'Saving...' : 'Save Profile'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

export default EmpCompanyProfilePage;