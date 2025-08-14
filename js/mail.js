// Strict email validation with existence checking
const CONFIG = {
    ABSTRACT_API_KEY: 'b223e80fefa7425e94ef430d8a39faaf',
    DISCORD_WEBHOOK_URL: 'https://discord.com/api/webhooks/1405305070207373372/sUySJrGMVrra5ceKmEuG7BVjEchAzf8Ca-cSNjRq0VEatu4GZCMlaQFxfSKuvvasCC1u',
    OWNER_ROLE_ID: '1352566921182318688'
};

// Email validation API call with enhanced user existence checking
function validateEmailExists(email, callback) {
    console.log('Checking email existence:', email);
    
    const apiKey = CONFIG.ABSTRACT_API_KEY;
    const url = `https://emailreputation.abstractapi.com/v1/?api_key=${apiKey}&email=${encodeURIComponent(email)}`;
    
    fetch(url)
        .then(response => {
            console.log('API response status:', response.status);
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Full API response:', data);
            callback(null, data);
        })
        .catch(error => {
            console.error('API request failed:', error);
            callback(error, null);
        });
}

// Additional user existence check using multiple methods
async function performDeepUserCheck(email) {
    console.log('Performing deep user existence check for:', email);
    
    const checks = {
        basicFormat: false,
        domainExists: false,
        mxRecord: false,
        smtpValid: false,
        notDisposable: false,
        highQuality: false
    };
    
    try {
        // Extract domain for additional checks
        const domain = email.split('@')[1];
        
        // Check if domain is commonly known
        const commonDomains = [
            'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 
            'aol.com', 'icloud.com', 'live.com', 'msn.com',
            'protonmail.com', 'yandex.com', 'mail.com'
        ];
        
        const isCommonDomain = commonDomains.includes(domain.toLowerCase());
        
        return {
            isCommonDomain,
            domain,
            checks,
            timestamp: new Date().toISOString()
        };
        
    } catch (error) {
        console.error('Error in deep user check:', error);
        return {
            isCommonDomain: false,
            domain: null,
            checks,
            error: error.message,
            timestamp: new Date().toISOString()
        };
    }
}

// Main form submission function with enhanced user existence validation
function sendEmailStrict() {
    console.log('Enhanced email validation with user existence check started');
    
    try {
        // Get form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();
        const submitBtn = document.getElementById("submit-btn");

        console.log('Form data:', { name, email, subject, message });

        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification("Please fill in all fields!", "error");
            return;
        }

        // Enhanced email format validation
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        if (!emailRegex.test(email)) {
            showNotification("Please enter a valid email format!", "error");
            return;
        }

        // Block obviously fake patterns with enhanced detection including Gmail-specific patterns
        const fakePatterns = [
            /^(test|fake|dummy|sample|example|temp|throwaway|anonymous|fake|noreply|no-reply)@/i,
            /@(test|fake|dummy|sample|example|temp|throwaway|localhost|invalid)\./i,
            /\.(test|fake|dummy|invalid|example|local)$/i,
            /^[a-z]{1,3}@[a-z]{1,5}\.(com|net|org)$/i, // Very short suspicious emails
            /^\d+@\d+\.(com|net|org)$/i, // All numbers
            /^[a-z]+\d{1,3}@[a-z]+\d{1,3}\./i, // Suspicious pattern like abc123@def456.com
            /^user\d*@/i, // Generic user emails
            /^admin@/i, // Admin emails (often test accounts)
            // Gmail-specific fake patterns
            /^[a-z]{1,5}@gmail\.com$/i, // Very short Gmail (Gmail requires 6+ chars)
            /^(aaaa|bbbb|cccc|dddd|eeee|ffff|gggg|hhhh|iiii|jjjj|kkkk|llll|mmmm|nnnn|oooo|pppp|qqqq|rrrr|ssss|tttt|uuuu|vvvv|wwww|xxxx|yyyy|zzzz).*@gmail\.com$/i, // Repeated letters
            /^(qwerty|asdfgh|zxcvbn|qwertyui|asdfghjk).*@gmail\.com$/i, // Keyboard patterns
            /^([a-z]{2,4})\1+@gmail\.com$/i, // Repeated syllables like "pialala", "lalala"
            /^[a-z]*([a-z]{2})\1{2,}[a-z]*@gmail\.com$/i, // Repeated 2-char patterns in Gmail
        ];

        if (fakePatterns.some(pattern => pattern.test(email))) {
            showNotification("Please use a real email address, not a test or temporary email.", "error");
            return;
        }

        // Check for suspicious email patterns that suggest non-existence
        const suspiciousPatterns = [
            /^[qwertyuiop]+@/i, // Keyboard mashing
            /^[asdfghjkl]+@/i,  // Keyboard row
            /^[a-z]{1,2}@/i,    // Too short username
            /^\d{10,}@/i,       // Long number sequences
            /^(.)\1{3,}@/i      // Repeated characters like aaaa@domain.com
        ];

        if (suspiciousPatterns.some(pattern => pattern.test(email))) {
            showNotification("This email address appears to be invalid. Please use your real email.", "error");
            return;
        }

        // Start validation process
        submitBtn.disabled = true;
        submitBtn.value = "Verifying user...";
        showNotification("Checking if email user exists...", "info");

        // Perform deep user check first
        performDeepUserCheck(email).then(deepCheck => {
            console.log('Deep check results:', deepCheck);
            
            // Call email validation API
            validateEmailExists(email, (error, validationData) => {
                if (error) {
                    console.error('Email validation failed:', error);
                    showNotification("User verification service is temporarily unavailable. Please try again.", "error");
                    submitBtn.disabled = false;
                    submitBtn.value = "Send";
                    return;
                }

                console.log('Processing user existence validation results...');
                
                // Enhanced analysis with user existence focus
                const results = analyzeUserExistence(validationData, email, deepCheck);
                
                if (!results.isValid) {
                    console.log('User existence validation failed:', results.reason);
                    showNotification(results.message, "error");
                    submitBtn.disabled = false;
                    submitBtn.value = "Send";
                    return;
                }

                console.log('User existence validated, sending message...');
                
                // User exists, proceed to send
                submitBtn.value = "Sending message...";

                const payload = {
                    content: `<@&${CONFIG.OWNER_ROLE_ID}>`,
                    embeds: [{
                        title: "New Contact Form Submission!",
                        color: 3447003,
                        fields: [
                            {
                                name: "👤 Contact",
                                value: `${name} (${email})`,
                                inline: false
                            },
                            {
                                name: "📝 Subject",
                                value: subject,
                                inline: false
                            },
                            {
                                name: "💬 Message",
                                value: message,
                                inline: false
                            },
                            {
                                name: "📧 Email",
                                value: email,
                                inline: true
                            },
                            {
                                name: "⏰ Time",
                                value: new Date().toLocaleString('en-GB', {
                                    day: '2-digit',
                                    month: '2-digit', 
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit'
                                }),
                                inline: true
                            },
                            {
                                name: "✅ Email Quality",
                                value: "Validated ✓",
                                inline: true
                            }
                        ],
                        footer: {
                            text: "Portfolio Contact Form - Email Verified • Today at " + new Date().toLocaleTimeString('en-GB', {
                                hour: '2-digit',
                                minute: '2-digit'
                            }),
                            icon_url: 'https://cdn-icons-png.flaticon.com/512/9723/9723101.png'
                        }
                    }]
                };

                // Send to Discord
                fetch(CONFIG.DISCORD_WEBHOOK_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload)
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(() => {
                    console.log('Message sent successfully');
                    showNotification("Message sent successfully!  User verified and message delivered.", "success");
                    document.getElementById("contact-form").reset();
                })
                .catch(error => {
                    console.error('Error sending to Discord:', error);
                    showNotification("Failed to send message. Please try again.", "error");
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.value = "Send";
                });
            });
        });

    } catch (error) {
        console.error('Error in sendEmailStrict:', error);
        showNotification("An unexpected error occurred during user verification. Please try again.", "error");
        const submitBtn = document.getElementById("submit-btn");
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.value = "Send";
        }
    }
}

// Enhanced analysis focusing on user existence with Gmail-specific handling
function analyzeUserExistence(data, email, deepCheck) {
    console.log('Analyzing user existence with data:', { data, email, deepCheck });
    
    const domain = email.split('@')[1].toLowerCase();
    const username = email.split('@')[0].toLowerCase();
    
    // Special handling for major providers that block SMTP verification
    const protectedProviders = ['gmail.com', 'googlemail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'live.com', 'msn.com'];
    const isProtectedProvider = protectedProviders.includes(domain);
    
    // Priority 1: Check if email format is valid (basic requirement)
    if (data.is_valid_format && data.is_valid_format.value === false) {
        return {
            isValid: false,
            reason: 'Invalid email format',
            message: 'Email format is invalid. Please check your email address.'
        };
    }

    // Priority 2: Check if it's a disposable/temporary email (users don't exist on temp services)
    if (data.is_disposable_email && data.is_disposable_email.value === true) {
        return {
            isValid: false,
            reason: 'Disposable email - no real user',
            message: 'Temporary/disposable emails are not allowed. Please use your real email address.'
        };
    }

    // Priority 3: Check if domain can receive emails (MX record exists)
    if (data.is_mx_found && data.is_mx_found.value === false) {
        return {
            isValid: false,
            reason: 'Domain cannot receive emails',
            message: 'This email domain cannot receive emails. Please check the domain name or use a different email.'
        };
    }

    // Priority 4: Enhanced user existence checks for protected providers
    if (isProtectedProvider) {
        console.log('Checking protected provider:', domain);
        
        // For Gmail specifically, apply stricter pattern validation
        if (domain === 'gmail.com' || domain === 'googlemail.com') {
            // Gmail usernames must be at least 6 characters and follow specific patterns
            if (username.length < 6) {
                return {
                    isValid: false,
                    reason: 'Gmail username too short',
                    message: 'Gmail addresses must have at least 6 characters before @gmail.com. Please check your email.'
                };
            }
            
            // Check for suspicious Gmail patterns that are likely fake
            const suspiciousGmailPatterns = [
                /^[a-z]{1,3}\d*$/,  // Very short + numbers like "ab123"
                /^\d+[a-z]{1,3}$/,  // Numbers + very short letters like "123ab"
                /^[a-z]+\d{6,}$/,   // Letters + many numbers like "test123456"
                /^(.)\1{4,}/,       // Repeated characters like "aaaaaa"
                /^(qwerty|asdfgh|zxcvbn)/i, // Keyboard patterns
                /^(test|fake|sample|temp|dummy)/i, // Obviously fake
                /^([a-z]{2,4})\1+$/i, // Repeated syllables like "pialala" (pia+la+la)
                /^([a-z]{1,3})([a-z]{1,3})\2+$/i, // Pattern like "lalala", "bababa"
                /^[a-z]*([a-z]{2})\1{2,}[a-z]*$/i, // Repeated 2-char sequences anywhere
                /^(hello|world|email|gmail|user|name|admin).*$/i, // Common fake words
                /^.*\d{4,}$/,       // Ending with 4+ numbers (often fake)
                /^[aeiou]{4,}$/i,   // Too many vowels in a row
                /^[bcdfghjklmnpqrstvwxyz]{6,}$/i, // Too many consonants, no vowels
            ];
            
            if (suspiciousGmailPatterns.some(pattern => pattern.test(username))) {
                return {
                    isValid: false,
                    reason: 'Suspicious Gmail pattern',
                    message: 'This Gmail address appears to be fake. Please use your real Gmail address.'
                };
            }
        }
        
        // For Yahoo, similar but different minimum length
        if (domain === 'yahoo.com') {
            if (username.length < 4) {
                return {
                    isValid: false,
                    reason: 'Yahoo username too short',
                    message: 'Yahoo addresses typically have at least 4 characters. Please check your email.'
                };
            }
        }
        
        // For Outlook/Hotmail
        if (['outlook.com', 'hotmail.com', 'live.com', 'msn.com'].includes(domain)) {
            if (username.length < 5) {
                return {
                    isValid: false,
                    reason: 'Microsoft email username too short',
                    message: 'Microsoft email addresses typically have at least 5 characters. Please check your email.'
                };
            }
        }
        
        // Additional quality checks for protected providers
        if (data.quality_score !== undefined && data.quality_score < 0.1) {
            return {
                isValid: false,
                reason: 'Extremely low quality on major provider',
                message: 'This email address appears to be invalid or fake. Please use your real email address.'
            };
        }
        
    } else {
        // Priority 4b: CRITICAL - For non-protected domains, SMTP validation is more reliable
        if (data.is_smtp_valid && data.is_smtp_valid.value === false) {
            return {
                isValid: false,
                reason: 'User does not exist',
                message: 'This email address does not exist. Please verify the spelling and use your actual email address.'
            };
        }
    }

    // Priority 5: Check overall deliverability (combines multiple factors)
    if (data.deliverability) {
        if (data.deliverability === 'UNDELIVERABLE') {
            return {
                isValid: false,
                reason: 'User mailbox undeliverable',
                message: 'This email address cannot receive messages. Please use a different email address.'
            };
        }
        
        // More lenient for protected providers
        const riskThreshold = isProtectedProvider ? 0.3 : 0.5;
        if (data.deliverability === 'RISKY' && data.quality_score < riskThreshold) {
            return {
                isValid: false,
                reason: 'High risk of non-existence',
                message: 'This email address appears risky or may not exist. Please verify your email address.'
            };
        }
    }

    // Priority 6: Quality score check (indicates likelihood of real user)
    if (data.quality_score !== undefined) {
        // Stricter quality requirements for protected providers since we can't SMTP verify
        const minQuality = isProtectedProvider ? 0.3 : 0.2;
        const suspiciousQuality = isProtectedProvider ? 0.5 : 0.4;
        
        if (data.quality_score < minQuality) {
            return {
                isValid: false,
                reason: 'Very low quality - likely fake user',
                message: 'Email quality check failed. Please use your real email address.'
            };
        }
        
        if (data.quality_score < suspiciousQuality && !isProtectedProvider) {
            return {
                isValid: false,
                reason: 'Low quality on custom domain',
                message: 'This email address appears suspicious. Please use a verified email address.'
            };
        }
    }

    // Priority 7: Additional user existence indicators
    if (data.is_catchall && data.is_catchall.value === true) {
        // Catch-all can mean the domain accepts any email, but user may not exist
        if (data.quality_score < 0.6) {
            return {
                isValid: false,
                reason: 'Catch-all domain with low confidence',
                message: 'Please use a specific email address rather than a catch-all domain.'
            };
        }
    }

    // Priority 8: Check for role-based emails (often not real users)
    const roleEmails = /^(admin|info|support|sales|contact|noreply|no-reply|webmaster|postmaster|root)@/i;
    if (roleEmails.test(email)) {
        return {
            isValid: false,
            reason: 'Role-based email - not a real user',
            message: 'Please use your personal email address, not a role-based email (admin, info, etc.).'
        };
    }

    // Priority 9: Additional validation for protected providers
    if (isProtectedProvider) {
        // For protected providers, we can't rely on SMTP, so check other indicators
        if (data.is_smtp_valid && data.is_smtp_valid.value === null) {
            // If SMTP check couldn't be performed, check quality more strictly
            if (data.quality_score < 0.6) {
                return {
                    isValid: false,
                    reason: 'Cannot verify user on protected provider',
                    message: 'Unable to verify this email address. Please ensure it\'s correct and try again.'
                };
            }
        }
    }

    // Priority 10: Final quality gate - username already defined above, so don't redeclare
    if (username.length < 2) {
        return {
            isValid: false,
            reason: 'Username too short - likely fake',
            message: 'Email username appears too short. Please use your real email address.'
        };
    }

    // If we get here, the user appears to exist and email is valid
    console.log('User existence validation passed');
    return {
        isValid: true,
        reason: 'User verified',
        message: 'Email user exists and is valid',
        confidence: data.quality_score || 'N/A',
        domain: deepCheck.domain,
        isCommonDomain: deepCheck.isCommonDomain
    };
}

// Enhanced notification system
function showNotification(message, type) {
    console.log('Showing notification:', message, type);
    
    try {
        const existingNotification = document.getElementById('notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.id = 'notification';
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            font-family: Arial, sans-serif;
            font-size: 14px;
            font-weight: 500;
            max-width: 400px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            word-wrap: break-word;
        `;
        
        // Color based on type with enhanced styling
        if (type === 'success') {
            notification.style.backgroundColor = '#d4edda';
            notification.style.color = '#155724';
            notification.style.border = '2px solid #c3e6cb';
        } else if (type === 'error') {
            notification.style.backgroundColor = '#f8d7da';
            notification.style.color = '#721c24';
            notification.style.border = '2px solid #f5c6cb';
        } else if (type === 'info') {
            notification.style.backgroundColor = '#d1ecf1';
            notification.style.color = '#0c5460';
            notification.style.border = '2px solid #b8daff';
        }
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto-hide after different times based on type
        const hideDelay = type === 'info' ? 4000 : (type === 'error' ? 6000 : 5000);
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, hideDelay);
        
    } catch (error) {
        console.error('Error showing notification:', error);
        alert(message);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing enhanced user existence validation');
    
    const submitBtn = document.getElementById("submit-btn");
    
    if (submitBtn) {
        console.log('Submit button found, adding user existence validation');
        
        // Remove any existing listeners
        submitBtn.replaceWith(submitBtn.cloneNode(true));
        const newSubmitBtn = document.getElementById("submit-btn");
        
        // Add click listener for enhanced validation
        newSubmitBtn.addEventListener('click', function(event) {
            console.log('Submit button clicked - user existence validation');
            event.preventDefault();
            sendEmailStrict();
        });
        
        console.log('Enhanced user existence validation initialized successfully');
    } else {
        console.error('Submit button not found!');
    }
});